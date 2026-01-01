<?php
// Prevent HTML output of errors
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Custom error handler to return JSON on fatal errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && ($error['type'] === E_ERROR || $error['type'] === E_PARSE || $error['type'] === E_CORE_ERROR || $error['type'] === E_COMPILE_ERROR)) {
        http_response_code(500);
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: *"); // Add CORS for errors too
        echo json_encode([
            "status" => "error",
            "message" => "Fatal Error: " . $error['message'],
            "file" => $error['file'],
            "line" => $error['line']
        ]);
        // Log to file for debugging
        file_put_contents(__DIR__ . '/debug_verify.log', date('[Y-m-d H:i:s] ') . "FATAL: " . print_r($error, true) . "\n", FILE_APPEND);
    }
});

// MOVE HEADERS TO TOP
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

function debugLog($msg) {
    file_put_contents(__DIR__ . '/debug_verify.log', date('[Y-m-d H:i:s] ') . $msg . "\n", FILE_APPEND);
}

debugLog("Request received: " . file_get_contents("php://input"));

try {
    // FIX: Case sensitive path
    require_once __DIR__ . "/../../config/Database.php";
    
    $db = new Database();
    $conn = $db->getConnection();

    $input  = json_decode(file_get_contents("php://input"), true);
    $tx_ref = $input['tx_ref'] ?? $_GET['tx_ref'] ?? null;

    if (!$tx_ref) {
        debugLog("Missing tx_ref");
        echo json_encode(["status"=>"failed","message"=>"Missing tx_ref"]);
        exit;
    }

    $CHAPA_SECRET_KEY = "CHASECK_TEST-WfCdb1qIebMz2cWx8awCqwM3NgNfbboy";

    // ---------- VERIFY WITH CHAPA ----------
    debugLog("Verifying with Chapa: $tx_ref");
    $ch = curl_init("https://api.chapa.co/v1/transaction/verify/$tx_ref");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $CHAPA_SECRET_KEY",
            "Content-Type: application/json"
        ]
    ]);
    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        throw new Exception("Curl error: " . curl_error($ch));
    }
    curl_close($ch);
    
    debugLog("Chapa response: $response");

    $result = json_decode($response, true);

    if (!$result || $result['status'] !== 'success' || $result['data']['status'] !== 'success') {
        echo json_encode(["status"=>"failed","message"=>"Payment not confirmed"]);
        exit;
    }

    // ---------- PAYMENT DATA ----------
    $data      = $result['data'];
    $metadata  = $data['meta'] ?? [];
    $attendees = $metadata['attendees'] ?? [];
    $event_id  = (int)($metadata['event_id'] ?? 0);
    $user_email = $data['email'];
    $ticket_type = $metadata['ticket_type'] ?? 'Regular';

    if (!$event_id || empty($attendees)) {
        debugLog("Invalid metadata: event_id=$event_id, attendees=" . count($attendees));
        echo json_encode(["status"=>"failed","message"=>"Invalid metadata"]);
        exit;
    }

    // ---------- LOCKING ----------
    $lockName = "lock_tx_" . $tx_ref;
    $lockStmt = $conn->prepare("SELECT GET_LOCK(?, 10)"); // Wait up to 10 seconds
    $lockStmt->bind_param("s", $lockName);
    $lockStmt->execute();
    $lockResult = $lockStmt->get_result()->fetch_row()[0];

    if (!$lockResult) {
        debugLog("Could not acquire lock for: $tx_ref");
        echo json_encode(["status"=>"failed", "message"=>"Could not acquire lock"]);
        exit;
    }


        // ---------- IDEMPOTENCY ----------
        // Now safe to check inside the lock
        $stmt = $conn->prepare("SELECT COUNT(*) AS total FROM tickets WHERE tx_ref=?");
        if (!$stmt) throw new Exception("Prepare failed (check duplicates): " . $conn->error);
        
        $stmt->bind_param("s", $tx_ref);
        $stmt->execute();
        $count = (int)$stmt->get_result()->fetch_assoc()['total'];
        
        if ($count > 0) {
            debugLog("Already processed: $tx_ref");
            echo json_encode(["status"=>"success","message"=>"Already processed", "ticket_codes" => []]); 
             // Release lock
            $conn->query("SELECT RELEASE_LOCK('$lockName')");
            exit;
        }

    // ---------- CREATE TICKETS ----------
    $conn->begin_transaction();

    $single_amount = ((float)$data['amount']) / count($attendees);
    $ticket_codes = [];

    foreach ($attendees as $attendee) {

        $ticket_code = 'TICKET-' . strtoupper(substr(md5(uniqid()),0,8));

        $stmt = $conn->prepare("
            INSERT INTO tickets
            (event_id,user_email,ticket_type,quantity,total_amount,payment_status,tx_ref,ticket_code,issued_at,created_at)
            VALUES (?,?,?,?,?,'paid',?,?,NOW(),NOW())
        ");
        if (!$stmt) throw new Exception("Prepare failed (insert ticket): " . $conn->error);

        $qty = 1;
        $stmt->bind_param(
            "issidss",
            $event_id,
            $user_email,
            $ticket_type,
            $qty,
            $single_amount,
            $tx_ref,
            $ticket_code
        );
        if (!$stmt->execute()) throw new Exception("Execute failed (insert ticket): " . $stmt->error);
        
        $ticket_id = $stmt->insert_id;

        $stmtAtt = $conn->prepare("
            INSERT INTO registration_attendees
            (registration_id,attendee_name,attendee_email,ticket_code)
            VALUES (?,?,?,?)
        ");
        if (!$stmtAtt) throw new Exception("Prepare failed (insert attendee): " . $conn->error);

        $attName = $attendee['name'];
        $attEmail = $attendee['email'] ?? $user_email;
        
        $stmtAtt->bind_param(
            "isss",
            $ticket_id,
            $attName,
            $attEmail,
            $ticket_code
        );
        if (!$stmtAtt->execute()) throw new Exception("Execute failed (insert attendee): " . $stmtAtt->error);

        $ticket_codes[] = [
            'ticket_code' => $ticket_code,
            'attendee_name' => $attName
        ];
    }

    $conn->commit();
    debugLog("Success! Tickets created: " . count($ticket_codes));

    echo json_encode([
        "status" => "success",
        "message" => count($ticket_codes) . " tickets created",
        "ticket_codes" => $ticket_codes
    ]);

} catch (Exception $e) {
    if (isset($conn) && $conn->connect_errno === 0) {
        $conn->rollback();
        if (isset($lockName)) {
            $conn->query("SELECT RELEASE_LOCK('$lockName')");
        }
    }
    
    $msg = "Error processing payment: " . $e->getMessage();
    debugLog($msg);
    http_response_code(500);
    echo json_encode(["status"=>"error", "message"=>$msg]);
} finally {
    // Ensure the lock is released even if an exception occurs
    if (isset($conn) && $conn->connect_errno === 0 && isset($lockName)) {
        $conn->query("SELECT RELEASE_LOCK('$lockName')");
    }
}
?>
