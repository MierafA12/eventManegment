<?php
require_once "../config/Database.php";
$db = (new Database())->getConnection();
$db->query("ALTER TABLE events CHANGE created_by user_id INT(11) NOT NULL");
$db->query("ALTER TABLE events CHANGE event_type eventType ENUM('Physical','Online') NOT NULL");
$db->query("ALTER TABLE events CHANGE event_link eventLink VARCHAR(500) DEFAULT NULL");
$db->query("ALTER TABLE events ADD COLUMN status ENUM('active','inactive','cancelled') DEFAULT 'active' AFTER image");
$db->query("ALTER TABLE events ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at");
echo "Done\n";
$result = $db->query("DESCRIBE events");
echo json_encode($result->fetch_all(MYSQLI_ASSOC));
?>
