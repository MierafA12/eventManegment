<?php
require_once __DIR__ . "/../config/database.php";

$db = (new Database())->getConnection();

// Check if 'datetime' column exists
$check = $db->query("SHOW COLUMNS FROM events LIKE 'datetime'");
if ($check->num_rows > 0) {
    echo "Found 'datetime' column. Migrating to 'event_date' and 'event_time'...\n";

    // 1. Add new columns
    $db->query("ALTER TABLE events ADD COLUMN event_date DATE AFTER location");
    $db->query("ALTER TABLE events ADD COLUMN event_time TIME AFTER event_date");

    // 2. Migrate data
    $db->query("UPDATE events SET event_date = DATE(datetime), event_time = TIME(datetime)");

    // 3. Drop old column
    $db->query("ALTER TABLE events DROP COLUMN datetime");
    
    // 4. Update Index
    $db->query("CREATE INDEX idx_event_date ON events(event_date)");
    $db->query("CREATE INDEX idx_event_time ON events(event_time)");

    echo "Migration successful! Columns 'event_date' and 'event_time' created.\n";
} else {
    // Check if we already migrated but maybe named them differently or correctly
    $check2 = $db->query("SHOW COLUMNS FROM events LIKE 'event_date'");
    if ($check2->num_rows > 0) {
        echo "Table already has 'event_date' column. No migration needed.\n";
    } else {
        // Fallback: check if 'date' exists (from previous attempt idea) and rename if so
        $check3 = $db->query("SHOW COLUMNS FROM events LIKE 'date'");
        if ($check3->num_rows > 0) {
            echo "Found 'date' column. Renaming to 'event_date'...\n";
            $db->query("ALTER TABLE events CHANGE COLUMN date event_date DATE");
            $db->query("ALTER TABLE events CHANGE COLUMN time event_time TIME");
            echo "Renamed 'date'/'time' to 'event_date'/'event_time'.\n";
        } else {
            echo "Unexpected schema state. Neither 'datetime' nor 'event_date' found.\n";
        }
    }
}
?>
