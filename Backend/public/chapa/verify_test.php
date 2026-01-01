<?php
// Disable display_errors to prevent HTML output that breaks JSON
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Set headers FIRST before any output
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Wrap in try-catch to ensure JSON response even on errors
try {
    include __DIR__ . "/../../config/database.php";
} catch (Exception $e) {
    error_log("Database include error: " . $e->getMessage());
    echo json_encode(["status" => "failed", "message" => "Database configuration error"]);
    exit;
}

// DB
$db = new Database();
$conn = $db->getConnection();

// Read tx_ref
$input = json_decode(file_get_contents("php://input"), true);
$tx_ref = $input['tx_ref'] ?? $_GET['tx_ref'] ?? null;

// Debug logging
error_log("=== TEST VERIFY (BYPASS CHAPA) ===");
error_log("Received tx_ref: " . ($tx_ref ?? 'NULL'));

if (!$tx_ref) {
    echo json_encode(["status" => "failed", "message" => "Missing tx_ref"]);
    exit;
}

// SIMULATE A SUCCESSFUL CHAPA RESPONSE
// This bypasses the actual Chapa API call for testing
$simulatedChapaResponse = [
    'status' => 'success',
    'data' => [
        'status' => 'success',
        'email' => 'test@example.com',
        'first_name' => 'Test',
        'last_name' => 'User',
        'amount' => 100,
        'metadata' => [
            'event_id' => 1,
            'ticket_type' => 'Regular',
            'quantity' => 1,
            'attendees' => [
                [
                    'name' => 'Test User',
                    'email' => 'test@example.com'
                ]
            ]
        ]
    ]
];

$result = $simulatedChapaResponse;
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
try {
    $stmt = $conn->prepare("SELECT * FROM events WHERE id=?");
    if (!$stmt) {
        throw new Exception("Failed to prepare event query: " . $conn->error);
    }
    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $event = $stmt->get_result()->fetch_assoc();
    
    if (!$event) {
        echo json_encode([
            "status" => "failed",
            "message" => "Event not found"
        ]);
        exit;
    }
} catch (Exception $e) {
    error_log("Event fetch error: " . $e->getMessage());
    echo json_encode([
        "status" => "failed",
        "message" => "Database error while fetching event"
    ]);
    exit;
}

$ticket_codes = [];

// Create tickets for each attendee
try {
    for ($i = 0; $i < $quantity; $i++) {
        $attendee = $attendees[$i] ?? [];
        
        // Generate unique ticket code for each attendee
        $ticket_code = 'TICKET-' . strtoupper(substr(md5(uniqid() . $i), 0, 8));
        
        $unique_tx_ref = $tx_ref . '-' . ($i + 1);
        
        // Insert into tickets table
        $stmt = $conn->prepare("
            INSERT INTO tickets
            (event_id, user_email, ticket_type, quantity, total_amount, payment_status, tx_ref, ticket_code, issued_at, created_at)
            VALUES (?,?,?,?,?,'paid',?,?,NOW(),NOW())
        ");
        
        if (!$stmt) {
            throw new Exception("Failed to prepare ticket insert: " . $conn->error);
        }

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
        
        if (!$stmt->execute()) {
            throw new Exception("Failed to insert ticket: " . $stmt->error);
        }
        
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
        
        if (!$stmtAtt) {
            throw new Exception("Failed to prepare attendee insert: " . $conn->error);
        }
        
        $stmtAtt->bind_param("isss", $ticket_id, $attendee_name, $attendee_email, $attendee_code);
        
        if (!$stmtAtt->execute()) {
            throw new Exception("Failed to insert attendee: " . $stmtAtt->error);
        }
        
        $ticket_codes[] = [
            'attendee_name' => $attendee_name,
            'attendee_email' => $attendee_email,
            'ticket_code' => $attendee_code
        ];
    }
} catch (Exception $e) {
    error_log("Ticket creation error: " . $e->getMessage());
    echo json_encode([
        "status" => "failed",
        "message" => "Database error while creating tickets"
    ]);
    exit;
}

// SUCCESS
echo json_encode([
    "status" => "success",
    "message" => "Payment verified successfully (TEST MODE - CHAPA BYPASSED). {$quantity} ticket(s) created.",
    "quantity" => $quantity,
    "ticket_codes" => $ticket_codes,
    "event_link" => ($event && strtolower($event['eventType']) === 'online') ? $event['eventLink'] : null,
    "test_mode" => true
]);
