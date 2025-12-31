<?php
require_once "../config/Database.php";
$db = (new Database())->getConnection();

echo "Starting database restoration...\n";

// 1. Create tickets table
$sql_tickets = "
CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    ticket_type VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('pending','paid','failed') DEFAULT 'pending',
    tx_ref VARCHAR(255) UNIQUE,
    ticket_code VARCHAR(100) UNIQUE,
    issued_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
)";

if ($db->query($sql_tickets)) {
    echo "Tickets table created or already exists.\n";
} else {
    echo "Error creating tickets table: " . $db->error . "\n";
}

// 2. Create registration_attendees table
$sql_attendees = "
CREATE TABLE IF NOT EXISTS registration_attendees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT NOT NULL,
    attendee_name VARCHAR(255) NOT NULL,
    attendee_email VARCHAR(255) NOT NULL,
    ticket_code VARCHAR(100),
    FOREIGN KEY (registration_id) REFERENCES tickets(id) ON DELETE CASCADE
)";

if ($db->query($sql_attendees)) {
    echo "Registration attendees table created or already exists.\n";
} else {
    echo "Error creating registration attendees table: " . $db->error . "\n";
}

// 3. Ensure events table has required columns (title, event_date, event_time, status)
// We know from diagnostic that title, event_date etc already exist, but let's be safe.
$cols = $db->query("DESCRIBE events")->fetch_all(MYSQLI_ASSOC);
$col_names = array_column($cols, 'Field');

if (!in_array('status', $col_names)) {
    $db->query("ALTER TABLE events ADD COLUMN status ENUM('active','inactive','cancelled') DEFAULT 'active'");
    echo "Added status column to events.\n";
}

echo "Database restoration finished.\n";
?>
