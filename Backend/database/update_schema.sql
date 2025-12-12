-- Update existing users table to add role and status columns
USE event_management;

-- Add role column if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS role ENUM('participant', 'admin', 'super_admin') DEFAULT 'participant' AFTER phone;

-- Add status column if it doesn't exist  
ALTER TABLE users ADD COLUMN IF NOT EXISTS status ENUM('active', 'inactive') DEFAULT 'active' AFTER role;

-- Add full_name column if it doesn't exist (for admins)
ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name VARCHAR(255) AFTER id;

-- Add username column if it doesn't exist (for admins)
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(100) AFTER full_name;

-- Add indexes
ALTER TABLE users ADD INDEX IF NOT EXISTS idx_role (role);
ALTER TABLE users ADD INDEX IF NOT EXISTS idx_email (email);

-- Insert sample super admin (password: admin123)
-- Password hash for 'admin123': $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO users (full_name, username, fullname, email, password, role, status) 
VALUES ('Super Admin', 'superadmin', 'Super Admin', 'admin@ethioevents.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', 'active')
ON DUPLICATE KEY UPDATE role='super_admin', status='active';

SELECT 'Schema updated successfully!' AS message;
