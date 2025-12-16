<?php
// ---------------- ERROR REPORTING ----------------
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ---------------- CORS ----------------
// Allow requests only from React app origin
$reactOrigin = "http://localhost:5173"; 
header("Access-Control-Allow-Origin: $reactOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ---------------- HEADERS ----------------
header("Content-Type: application/json");

// ---------------- SESSION ----------------
session_start();

// ---------------- INCLUDES ----------------
require_once __DIR__ . "/../config/Database.php";
require_once __DIR__ . "/../model/User.php";
require_once __DIR__ . "/../controller/AuthController.php";
require_once __DIR__ . "/../controller/ParticipantController.php";
require_once __DIR__ . "/../controller/AdminController.php";
require_once __DIR__ . "/../controller/statusController.php";
require_once __DIR__ . "/../route/UserRoute.php";
require_once __DIR__ . "/../route/AdminRoute.php";
require_once __DIR__ . "/../route/EventRoute.php";

// ---------------- ROUTER ----------------
$method = $_SERVER["REQUEST_METHOD"];
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

// Remove base path
$base = "/EthioEvents/Backend/public";
$path = str_replace($base, "", $path);
$path = strtolower($path);

// Construct route key
$routeKey = "$method $path";

// ---------------- DATABASE CONNECTION ----------------
$db = (new Database())->getConnection();

// ---------------- GET JSON BODY ----------------
$requestBody = file_get_contents("php://input");
$requestData = json_decode($requestBody, true);

// ---------------- CALL ROUTE ----------------
if (isset($routes[$routeKey])) {
    $response = $routes[$routeKey]($db, $requestData);
    
    // Optional: set HTTP status if provided
    if (isset($response['status'])) {
        http_response_code($response['status']);
        unset($response['status']);
    }
    
    echo json_encode($response);
} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Route not found: $routeKey",
        "route" => $routeKey
    ]);
}
