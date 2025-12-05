<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ---------------- CORS ----------------
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// ---------------- INCLUDE ----------------
require_once "../config/Database.php";
require_once "../model/User.php";
require_once "../controller/AuthController.php";
require_once "../controller/ParticipantController.php";
require_once "../route/UserRoute.php";
 require_once "../controller/statusController.php";

// ---------------- ROUTER ----------------
$method = $_SERVER["REQUEST_METHOD"];
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

// Adjust base
$base = "/EthioEvents/Backend/public";
$path = str_replace($base, "", $path);
$path = strtolower($path);

// Route key
$routeKey = "$method $path";

// DB connection
$db = (new Database())->connect();

// Request body
$request = file_get_contents("php://input");

// Call route
if (isset($routes[$routeKey])) {
    $response = $routes[$routeKey]($db, $request);
    echo json_encode($response);
} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Route not found: $routeKey",
        "route" => $routeKey
    ]);
}
