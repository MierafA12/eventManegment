<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once "../config/Database.php";

echo "<h1>Resetting Admin Password...</h1>";

try {
    $db = (new Database())->getConnection();
    
    $email = 'admin@ethioevents.com';
    $password = 'admin123';
    
    // Generate new secure hash
    $hash = password_hash($password, PASSWORD_DEFAULT);
    
    // Update the database
    $stmt = $db->prepare("UPDATE users SET password = ? WHERE email = ?");
    $stmt->bind_param("ss", $hash, $email);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "<h2 style='color: green;'>✅ Success! Password updated.</h2>";
            echo "<p>User: <strong>$email</strong></p>";
            echo "<p>New Password: <strong>$password</strong></p>";
            echo "<p>Database Hash: " . substr($hash, 0, 20) . "...</p>";
            echo "<hr>";
            echo "<p>👉 <a href='http://localhost:5173'>Go to Admin Panel Login</a></p>";
        } else {
            echo "<h2 style='color: orange;'>⚠️ Warning</h2>";
            echo "<p>Query ran, but no rows were changed. The password might already be 'admin123' or the user '$email' does not exist.</p>";
        }
    } else {
        echo "<h2 style='color: red;'>❌ Error</h2>";
        echo "<p>Failed to update password: " . $stmt->error . "</p>";
    }
    
} catch (Exception $e) {
    echo "<h2 style='color: red;'>❌ Exception</h2>";
    echo $e->getMessage();
}
?>
