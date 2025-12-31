<?php
require_once "../config/Database.php";
$db = (new Database())->getConnection();
$result = $db->query("DESCRIBE events");
if (!$result) {
    die(json_encode(["error" => $db->error]));
}
$columns = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($columns);
?>
