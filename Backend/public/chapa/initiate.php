<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$CHAPA_SECRET_KEY = "CHASECK_TEST-WfCdb1qIebMz2cWx8awCqwM3NgNfbboy";

$input = json_decode(file_get_contents("php://input"), true);

require __DIR__ . "/../../config/database.php";
$db = new Database();
$conn = $db->getConnection();

$metadata   = $input['metadata'] ?? [];
$event_id   = (int)($metadata['event_id'] ?? 0);
$attendees  = $metadata['attendees'] ?? [];
$quantity   = count($attendees);

// ---------- CAPACITY CHECK ----------
if ($event_id > 0) {
    $stmt = $conn->prepare("SELECT capacity, eventType FROM events WHERE id=?");
    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $event = $stmt->get_result()->fetch_assoc();

    if ($event && $event['eventType'] === 'Physical') {
        $stmt = $conn->prepare(
            "SELECT COUNT(*) AS total FROM tickets 
             WHERE event_id=? AND payment_status='paid'"
        );
        $stmt->bind_param("i", $event_id);
        $stmt->execute();
        $registered = (int)$stmt->get_result()->fetch_assoc()['total'];

        if (($registered + $quantity) > (int)$event['capacity']) {
            echo json_encode([
                "status" => "error",
                "message" => "Event capacity full"
            ]);
            exit;
        }
    }
}

// ---------- REQUIRED FIELDS ----------
$required = ["amount","currency","email","first_name","last_name","tx_ref","return_url"];
foreach ($required as $field) {
    if (empty($input[$field])) {
        echo json_encode(["status"=>"error","message"=>"Missing $field"]);
        exit;
    }
}

// ---------- CHAPA PAYLOAD ----------
$payload = [
    "amount" => (string)$input["amount"],
    "currency" => $input["currency"],
    "email" => $input["email"],
    "first_name" => $input["first_name"],
    "last_name" => $input["last_name"],
    "tx_ref" => $input["tx_ref"],
    "return_url" => $input["return_url"],
    "customization" => [
        "title" => "Event Ticket",
        "description" => "Event Registration"
    ],
    "meta" => $metadata
];

$ch = curl_init("https://api.chapa.co/v1/transaction/initialize");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $CHAPA_SECRET_KEY",
        "Content-Type: application/json"
    ]
]);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);

if (!$result || $result['status'] !== 'success') {
    echo json_encode([
        "status" => "error",
        "message" => "Chapa initialization failed"
    ]);
    exit;
}

echo json_encode([
    "status" => "success",
    "data" => [
        "checkout_url" => $result['data']['checkout_url']
    ]
]);
