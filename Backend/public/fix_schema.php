<?php
require_once "../config/Database.php";
$db = (new Database())->getConnection();

// Rename created_by to user_id (if it exists)
$db->query("ALTER TABLE events CHANGE created_by user_id INT(11) NOT NULL");
$db->query("ALTER TABLE events CHANGE event_type eventType ENUM('Physical','Online') NOT NULL");
$db->query("ALTER TABLE events CHANGE event_link eventLink VARCHAR(500) DEFAULT NULL");
$db->query("ALTER TABLE events ADD COLUMN status ENUM('active','inactive','cancelled') DEFAULT 'active' AFTER image");
$db->query("ALTER TABLE events ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at");

echo "Schema updated successfully (or already aligned)\n";

// Show final schema
$result = $db->query("DESCRIBE events");
$columns = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($columns, JSON_PRETTY_PRINT);
?>
