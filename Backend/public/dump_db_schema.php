<?php
require_once "../config/Database.php";
$db = (new Database())->getConnection();

$tables = [];
$result = $db->query("SHOW TABLES");
while ($row = $result->fetch_array()) {
    $table = $row[0];
    $columns = [];
    $res = $db->query("DESCRIBE `$table`");
    while ($col = $res->fetch_assoc()) {
        $columns[] = $col;
    }
    $tables[$table] = $columns;
}

header("Content-Type: application/json");
echo json_encode($tables, JSON_PRETTY_PRINT);
?>
