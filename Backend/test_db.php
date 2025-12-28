<?php
require_once "config/Database.php";
$db = (new Database())->getConnection();

echo "--- EVENTS TABLE ---\n";
$res = $db->query("DESCRIBE events");
while($row = $res->fetch_assoc()) {
    echo $row['Field'] . " (" . $row['Type'] . ")\n";
}

echo "\n--- TICKETS TABLE ---\n";
$res = $db->query("DESCRIBE tickets");
while($row = $res->fetch_assoc()) {
    echo $row['Field'] . " (" . $row['Type'] . ")\n";
}

echo "\n--- SAMPLE EVENT ---\n";
$res = $db->query("SELECT * FROM events LIMIT 1");
$event = $res->fetch_assoc();
print_r($event);

if ($event) {
    $id = $event['id'];
    echo "\n--- TESTING getEvent QUERY FOR ID: $id ---\n";
    $sql = "
        SELECT *, 
        (SELECT IFNULL(SUM(quantity), 0) FROM tickets WHERE event_id = events.id AND payment_status = 'paid') as registered_count
        FROM events 
        WHERE id = ? 
        LIMIT 1
    ";
    $stmt = $db->prepare($sql);
    if (!$stmt) {
        echo "Prepare failed: " . $db->error . "\n";
    } else {
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $res = $stmt->get_result();
        $data = $res->fetch_assoc();
        print_r($data);
    }
}
?>
