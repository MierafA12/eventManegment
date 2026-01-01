<?php
require_once "../config/Database.php";
$conn = (new Database())->getConnection();

echo "Checking tickets table indices:\n";
$res = $conn->query("SHOW INDEX FROM tickets WHERE Column_name = 'tx_ref'");
while ($row = $res->fetch_assoc()) {
    print_r($row);
}

echo "\nAttempting duplicate insert test:\n";
$tx_ref_test = "TEST_REF_" . time();
$conn->query("INSERT INTO tickets (event_id, tx_ref, amount) VALUES (1, '$tx_ref_test', 100)"); // simplistic mock insert
// schema likely requires more fields, but let's check index first.
?>
