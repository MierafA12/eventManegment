<?php
error_reporting(0); // Suppress warnings
require_once "../config/Database.php";
$conn = (new Database())->getConnection(); // Changed $db to $conn for consistency with the new code

$tables = ['tickets'];
foreach ($tables as $table) {
    echo "\n\nTABLE: $table\n";
    echo str_pad("Field", 20) . str_pad("Type", 20) . str_pad("Key", 10) . "Extra\n";
    echo str_repeat("-", 60) . "\n";
    
    $result = $conn->query("DESCRIBE $table");
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            echo str_pad($row['Field'], 20) . str_pad($row['Type'], 20) . str_pad($row['Key'], 10) . $row['Extra'] . "\n";
        }
    }
    
    // Check FKs
    $sql = "SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = 'ethioevents' AND TABLE_NAME = '$table' AND REFERENCED_TABLE_NAME IS NOT NULL";
    
    $resFK = $conn->query($sql);
    if($resFK && $resFK->num_rows > 0) {
       echo "\nFOREIGN KEYS:\n";
       while($fk = $resFK->fetch_assoc()) {
           echo "  " . $fk['CONSTRAINT_NAME'] . ": " . $fk['COLUMN_NAME'] . " -> " . $fk['REFERENCED_TABLE_NAME'] . "(" . $fk['REFERENCED_COLUMN_NAME'] . ")\n";
       }
    }
}
?>
