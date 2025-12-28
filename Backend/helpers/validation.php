<?php
/**
 * Validate password strength
 * Requires: 
 * - Min 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 */
function validatePasswordStrength($password) {
    if (strlen($password) < 8) {
        return ["success" => false, "message" => "Password must be at least 8 characters long"];
    }
    if (!preg_match('/[A-Z]/', $password)) {
        return ["success" => false, "message" => "Password must contain at least one uppercase letter"];
    }
    if (!preg_match('/[a-z]/', $password)) {
        return ["success" => false, "message" => "Password must contain at least one lowercase letter"];
    }
    return ["success" => true];
}
?>
