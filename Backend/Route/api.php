<?php
require_once __DIR__ . '/../controllers/PaymentController.php';

header('Content-Type: application/json');

// Payment routes
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/public/initiate') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller = new PaymentController();
    $response = $controller->initializePayment($data);
    echo json_encode($response);
    exit;
}

// Verify payment route
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/api/payments/verify/') === 0) {
    $tx_ref = str_replace('/api/payments/verify/', '', $_SERVER['REQUEST_URI']);
    $controller = new PaymentController();
    $response = $controller->verifyPayment($tx_ref);
    echo json_encode($response);
    exit;
}

// Webhook route
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/webhook/chapa') {
    $payload = json_decode(file_get_contents('php://input'), true);
    $controller = new PaymentController();
    $response = $controller->handleWebhook($payload);
    echo json_encode($response);
    exit;
}