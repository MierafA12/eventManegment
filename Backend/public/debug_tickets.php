<?php
header('Content-Type: application/json');
require_once "../config/Database.php";
$conn = (new Database())->getConnection();

$tickets = [];
$res = $conn->query("SELECT * FROM tickets ORDER BY created_at DESC LIMIT 5");
if ($res) {
    while ($row = $res->fetch_assoc()) {
        $tickets[] = $row;
    }
}

$attendees = [];
$res = $conn->query("SELECT * FROM registration_attendees ORDER BY id DESC LIMIT 5");
if ($res) {
    while ($row = $res->fetch_assoc()) {
        $attendees[] = $row;
    }
}

echo json_encode(['tickets' => $tickets, 'attendees' => $attendees], JSON_PRETTY_PRINT);
?>
