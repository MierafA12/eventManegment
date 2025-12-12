<?php
// Test login endpoint directly
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../config/Database.php";
require_once "../Model/user.php";
require_once "../Controller/AuthController.php";

try {
    // Test database connection
    $db = (new Database())->getConnection();
    echo "✓ Database connected\n";
    
    // Check if users table has role column
    $result = $db->query("DESCRIBE users");
    $columns = [];
    while ($row = $result->fetch_assoc()) {
        $columns[] = $row['Field'];
    }
    echo "✓ Users table columns: " . implode(", ", $columns) . "\n";
    
    // Check if role column exists
    if (!in_array('role', $columns)) {
        echo "✗ ERROR: 'role' column is MISSING from users table!\n";
        echo "  You need to run the database update script.\n";
    } else {
        echo "✓ Role column exists\n";
    }
    
    // Check if super admin exists
    $result = $db->query("SELECT * FROM users WHERE email='admin@ethioevents.com'");
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo "✓ Super admin found: " . json_encode([
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'] ?? 'N/A',
            'status' => $user['status'] ?? 'N/A'
        ]) . "\n";
    } else {
        echo "✗ Super admin NOT found in database\n";
        echo "  You need to insert the admin user.\n";
    }
    
    // Test login
    echo "\n--- Testing login ---\n";
    $userModel = new UserModel($db);
    $controller = new AuthController($userModel);
    
    $testRequest = json_encode([
        'email' => 'admin@ethioevents.com',
        'password' => 'admin123'
    ]);
    
    $response = $controller->login($testRequest);
    echo "Login response: " . json_encode($response, JSON_PRETTY_PRINT) . "\n";
    
} catch (Exception $e) {
    echo "✗ ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
?>
