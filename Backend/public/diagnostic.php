<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html");
ini_set('display_errors', 1);
error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Database Diagnostic</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #4ade80; }
        .success { color: #4ade80; }
        .error { color: #ff4444; }
        .info { color: #ffaa00; }
        pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; }
        h2 { color: #ffffff; }
    </style>
</head>
<body>
    <h1>🔍 EthioEvents Backend Diagnostic</h1>
    
    <?php
    try {
        echo "<h2>1. Database Connection</h2>";
        require_once "../config/Database.php";
        $db = (new Database())->getConnection();
        echo "<p class='success'>✓ Database connected successfully</p>";
        
        echo "<h2>2. Users Table Structure</h2>";
        $result = $db->query("DESCRIBE users");
        echo "<pre>";
        printf("%-20s %-20s %-10s\n", "Field", "Type", "Null");
        echo str_repeat("-", 50) . "\n";
        $columns = [];
        while ($row = $result->fetch_assoc()) {
            printf("%-20s %-20s %-10s\n", $row['Field'], $row['Type'], $row['Null']);
            $columns[] = $row['Field'];
        }
        echo "</pre>";
        
        if (!in_array('role', $columns)) {
            echo "<p class='error'>✗ ERROR: 'role' column is MISSING!</p>";
            echo "<p class='info'>⚠ Run this SQL in phpMyAdmin:</p>";
            echo "<pre>ALTER TABLE users ADD COLUMN role ENUM('participant', 'admin', 'super_admin') DEFAULT 'participant' AFTER phone;</pre>";
        } else {
            echo "<p class='success'>✓ Role column exists</p>";
        }
        
        if (!in_array('status', $columns)) {
            echo "<p class='error'>✗ ERROR: 'status' column is MISSING!</p>";
            echo "<pre>ALTER TABLE users ADD COLUMN status ENUM('active', 'inactive') DEFAULT 'active' AFTER role;</pre>";
        } else {
            echo "<p class='success'>✓ Status column exists</p>";
        }
        
        echo "<h2>3. Admin Users</h2>";
        $result = $db->query("SELECT id, email, role, status FROM users WHERE role IN ('admin', 'super_admin')");
        if ($result->num_rows > 0) {
            echo "<pre>";
            printf("%-5s %-30s %-15s %-10s\n", "ID", "Email", "Role", "Status");
            echo str_repeat("-", 60) . "\n";
            while ($row = $result->fetch_assoc()) {
                printf("%-5s %-30s %-15s %-10s\n", 
                    $row['id'], 
                    $row['email'], 
                    $row['role'], 
                    $row['status']
                );
            }
            echo "</pre>";
            echo "<p class='success'>✓ Admin users found</p>";
        } else {
            echo "<p class='error'>✗ No admin users found</p>";
            echo "<p class='info'>⚠ Run this SQL to create admin:</p>";
            echo "<pre>INSERT INTO users (full_name, username, fullname, email, password, role, status) 
VALUES ('Super Admin', 'superadmin', 'Super Admin', 'admin@ethioevents.com', 
'\$2y\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', 'active');</pre>";
        }
        
        echo "<h2>4. Test Login Query</h2>";
        $email = 'admin@ethioevents.com';
        $result = $db->query("SELECT * FROM users WHERE email='$email'");
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            echo "<pre>";
            echo "Found user:\n";
            echo "  ID: " . $user['id'] . "\n";
            echo "  Email: " . $user['email'] . "\n";
            echo "  Role: " . ($user['role'] ?? 'NULL') . "\n";
            echo "  Status: " . ($user['status'] ?? 'NULL') . "\n";
            echo "  Password hash: " . substr($user['password'], 0, 20) . "...\n";
            echo "</pre>";
            
            // Test password
            if (password_verify('admin123', $user['password'])) {
                echo "<p class='success'>✓ Password 'admin123' is CORRECT</p>";
            } else {
                echo "<p class='error'>✗ Password 'admin123' does NOT match</p>";
            }
        } else {
            echo "<p class='error'>✗ User admin@ethioevents.com NOT found</p>";
        }
        
    } catch (Exception $e) {
        echo "<h2 class='error'>Error</h2>";
        echo "<pre class='error'>";
        echo $e->getMessage() . "\n\n";
        echo $e->getTraceAsString();
        echo "</pre>";
    }
    ?>
    
    <h2>5. Next Steps</h2>
    <p class='info'>If you see errors above, fix them by running the SQL commands in phpMyAdmin.</p>
    <p>Then try logging in with:</p>
    <pre>Email: admin@ethioevents.com
Password: admin123</pre>
    
</body>
</html>
