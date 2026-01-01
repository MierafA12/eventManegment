<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . "/../../config/database.php";
$db = new Database();
$conn = $db->getConnection();

$input  = json_decode(file_get_contents("php://input"), true);
$tx_ref = $input['tx_ref'] ?? $_GET['tx_ref'] ?? null;

if (!$tx_ref) {
    echo json_encode(["status"=>"failed","message"=>"Missing tx_ref"]);
    exit;
}

$CHAPA_SECRET_KEY = "CHASECK_TEST-WfCdb1qIebMz2cWx8awCqwM3NgNfbboy";

// ---------- VERIFY WITH CHAPA ----------
$ch = curl_init("https://api.chapa.co/v1/transaction/verify/$tx_ref");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $CHAPA_SECRET_KEY",
        "Content-Type: application/json"
    ]
]);
$response = curl_exec($ch);
curl_close($ch);

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
    echo json_encode(["status"=>"failed","message"=>"Invalid metadata"]);
    exit;
}

// ---------- IDEMPOTENCY ----------
$stmt = $conn->prepare("SELECT COUNT(*) AS total FROM tickets WHERE tx_ref=?");
$stmt->bind_param("s", $tx_ref);
$stmt->execute();
if ((int)$stmt->get_result()->fetch_assoc()['total'] > 0) {
    echo json_encode(["status"=>"success","message"=>"Already processed"]);
    exit;
}

// ---------- CREATE TICKETS ----------
try {
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
        $stmt->execute();
        $ticket_id = $stmt->insert_id;

        $stmtAtt = $conn->prepare("
            INSERT INTO registration_attendees
            (registration_id,attendee_name,attendee_email,ticket_code)
            VALUES (?,?,?,?)
        ");

        $stmtAtt->bind_param(
            "isss",
            $ticket_id,
            $attendee['name'],
            $attendee['email'] ?? $user_email,
            $ticket_code
        );
        $stmtAtt->execute();

        $ticket_codes[] = $ticket_code;
    }

    $conn->commit();

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["status"=>"failed","message"=>$e->getMessage()]);
    exit;
}

echo json_encode([
    "status" => "success",
    "message" => count($ticket_codes) . " tickets created",
    "tickets" => $ticket_codes
]);
