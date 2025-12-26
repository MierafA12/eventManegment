<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include __DIR__ . "/../../config/database.php";

// DB
$db = new Database();
$conn = $db->getConnection();

// Read tx_ref
$input = json_decode(file_get_contents("php://input"), true);
$tx_ref = $input['tx_ref'] ?? $_GET['tx_ref'] ?? null;

if (!$tx_ref) {
    echo json_encode(["status" => "failed", "message" => "Missing tx_ref"]);
    exit;
}

$CHAPA_SECRET_KEY = "CHASECK_TEST-WfCdb1qIebMz2cWx8awCqwM3NgNfbboy";

// Verify with Chapa
$ch = curl_init("https://api.chapa.co/v1/transaction/verify/$tx_ref");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $CHAPA_SECRET_KEY",
        "Content-Type: application/json"
    ],
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false
]);

$response = curl_exec($ch);

if ($response === false) {
    echo json_encode([
        "status" => "failed",
        "message" => "cURL error",
        "error" => curl_error($ch)
    ]);
    exit;
}

curl_close($ch);

$result = json_decode($response, true);

if (!$result) {
    echo json_encode([
        "status" => "failed",
        "message" => "Invalid JSON from Chapa",
        "raw" => $response
    ]);
    exit;
}

if (
    !isset($result['status'], $result['data']['status']) ||
    $result['status'] !== 'success' ||
    $result['data']['status'] !== 'success'
) {
    echo json_encode([
        "status" => "failed",
        "message" => $result['message'] ?? "Payment not confirmed"
    ]);
    exit;
}

// ================= PAYMENT VERIFIED =================

$data = $result['data'];
$user_email = $data['email'];
$first_name = $data['first_name'] ?? 'Customer';
$last_name  = $data['last_name'] ?? 'User';
$amount     = $data['amount'];
$metadata   = $data['metadata'] ?? [];

$event_id   = (int)($metadata['event_id'] ?? 0);
$ticket_type = $metadata['ticket_type'] ?? 'Regular';
$attendees   = $metadata['attendees'] ?? [];
$quantity = isset($metadata['quantity']) && (int)$metadata['quantity'] > 0
    ? (int)$metadata['quantity']
    : max(1, count($metadata['attendees'] ?? []));



// Fetch event
$stmt = $conn->prepare("SELECT * FROM events WHERE id=?");
$stmt->bind_param("i", $event_id);
$stmt->execute();
$event = $stmt->get_result()->fetch_assoc();

$ticket_codes = [];

// Create tickets for each attendee
for ($i = 0; $i < $quantity; $i++) {
    $attendee = $attendees[$i] ?? [];
    
    // Generate unique ticket code for each attendee
    $ticket_code = 'TICKET-' . strtoupper(substr(md5(uniqid() . $i), 0, 8));
    
    $unique_tx_ref = $tx_ref . '-' . ($i + 1);
    
    // Insert into tickets table
    $stmt = $conn->prepare("
        INSERT INTO tickets
        (event_id, user_email, ticket_type, quantity, total_amount, payment_status, tx_ref, ticket_code, issued_at, created_at)
        VALUES (?,?,?,?,?,'Paid',?,?,NOW(),NOW())
    ");

    // Each ticket has quantity = 1
    $single_quantity = 1;
    $amount = (float) $data['amount'];
$single_amount = $amount / $quantity;


    $stmt->bind_param(
        "issiiss",
        $event_id,
        $user_email,
        $ticket_type,
        $single_quantity,
        $single_amount,
        $unique_tx_ref,
        $ticket_code
    );
    $stmt->execute();
    $ticket_id = $stmt->insert_id;

    // Get attendee details
    $attendee_name  = $attendee['name'] ?? trim("$first_name $last_name");
    $attendee_email = $attendee['email'] ?? $user_email;

    // Generate unique attendee code
    $attendee_code = $ticket_code . '-' . strtoupper(substr(md5(uniqid()), 0, 4));

    // Insert into registration_attendees table
    $stmtAtt = $conn->prepare("
        INSERT INTO registration_attendees
        (registration_id, attendee_name, attendee_email, ticket_code)
        VALUES (?,?,?,?)
    ");
    $stmtAtt->bind_param("isss", $ticket_id, $attendee_name, $attendee_email, $attendee_code);
    $stmtAtt->execute();
    
    $ticket_codes[] = [
        'attendee_name' => $attendee_name,
        'attendee_email' => $attendee_email,
        'ticket_code' => $attendee_code
    ];
}

// SUCCESS
echo json_encode([
    "status" => "success",
    "message" => "Payment verified successfully. {$quantity} ticket(s) created.",
    "quantity" => $quantity,
    "ticket_codes" => $ticket_codes,
    "event_link" => ($event && strtolower($event['eventType']) === 'online') ? $event['eventLink'] : null
]);
?>