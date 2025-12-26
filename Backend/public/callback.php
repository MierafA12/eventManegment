<?php
header("Content-Type: application/json");
require_once "../config/Database.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input['tx_ref'])) {
    http_response_code(400);
    echo json_encode(["status" => "failed", "message" => "Invalid request"]);
    exit();
}

$db = (new Database())->getConnection();
$tx_ref = $input['tx_ref'];

// Verify with Chapa
$secretKey = "CHASECK_TEST-WfCdb1qIebMz2cWx8awCqwM3NgNfbboy";
$ch = curl_init("https://api.chapa.co/v1/transaction/verify/" . $tx_ref);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ["Authorization: Bearer $secretKey"]
]);

$response = curl_exec($ch);
curl_close($ch);

$verification = json_decode($response, true);

if ($verification && $verification['status'] === 'success') {
    // Update payment status
    $update = $db->prepare("
        UPDATE payments 
        SET payment_status = 'completed', payment_way = 'chapa' 
        WHERE tx_ref = ?
    ");
    $update->bind_param("s", $tx_ref);
    $update->execute();
    $update->close();
    
    // You can also update ticket status if needed
    echo json_encode(["status" => "success", "message" => "Payment verified"]);
} else {
    // Mark as failed
    $update = $db->prepare("UPDATE payments SET payment_status = 'failed' WHERE tx_ref = ?");
    $update->bind_param("s", $tx_ref);
    $update->execute();
    $update->close();
    
    echo json_encode(["status" => "failed", "message" => "Payment verification failed"]);
}
?>