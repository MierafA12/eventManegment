<?php
require_once "../config/Database.php";
$db = (new Database())->getConnection();
$result = $db->query("DESCRIBE participants");
if (!$result) die(json_encode(["error" => $db->error]));
echo json_encode($result->fetch_all(MYSQLI_ASSOC));
?>
