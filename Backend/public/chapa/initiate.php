<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$CHAPA_SECRET_KEY = "CHASECK_TEST-WfCdb1qIebMz2cWx8awCqwM3NgNfbboy"; // REAL KEY

$input = json_decode(file_get_contents("php://input"), true);

$required = ["amount", "currency", "email", "first_name", "last_name", "tx_ref", "return_url"];

foreach ($required as $field) {
    if (empty($input[$field])) {
        echo json_encode([
            "status" => "error",
            "message" => "Missing field: $field"
        ]);
        exit;
    }
}

$payload = [
    "amount" => (string)$input["amount"],
    "currency" => $input["currency"],
    "email" => $input["email"],
    "first_name" => $input["first_name"],
    "last_name" => $input["last_name"],
    "tx_ref" => $input["tx_ref"],
    "return_url" => $input["return_url"]
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
$error = curl_error($ch);
curl_close($ch);

$result = json_decode($response, true);

if (!$result || empty($result["status"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Chapa initialization failed",
        "debug" => $result ?? $error
    ]);
    exit;
}

echo json_encode([
    "status" => "success",
    "data" => [
        "checkout_url" => $result["data"]["checkout_url"]
    ]
]);
