# Database Setup Instructions

## Issue
The admin panel login is failing because the `users` table is missing the `role` and `status` columns needed for admin authentication.

## Solution - Update the Database Schema

### Method 1: Using phpMyAdmin (Recommended)

1. **Open phpMyAdmin**
   - Navigate to `http://localhost/phpmyadmin` in your browser
   
2. **Select the Database**
   - Click on `event_management` database in the left sidebar
   
3. **Run the SQL Script**
   - Click the "SQL" tab at the top
   - Copy and paste the following SQL:

```sql
-- Add role column
ALTER TABLE users ADD COLUMN role ENUM('participant', 'admin', 'super_admin') DEFAULT 'participant' AFTER phone;

-- Add status column  
ALTER TABLE users ADD COLUMN status ENUM('active', 'inactive') DEFAULT 'active' AFTER role;

-- Add full_name column (for admins)
ALTER TABLE users ADD COLUMN full_name VARCHAR(255) AFTER id;

-- Add username column (for admins)
ALTER TABLE users ADD COLUMN username VARCHAR(100) AFTER full_name;

-- Insert sample super admin (password: admin123)
INSERT INTO users (full_name, username, fullname, email, password, role, status) 
VALUES ('Super Admin', 'superadmin', 'Super Admin', 'admin@ethioevents.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', 'active')
ON DUPLICATE KEY UPDATE role='super_admin', status='active';
```

4. **Click "Go"** to execute the SQL

### Method 2: Using Command Line

Run this command in your terminal (from the Backend directory):

```cmd
C:\xampp\mysql\bin\mysql.exe -u root event_management < database\update_schema.sql
```

## Test Login Credentials

After updating the database, use these credentials to login:

- **Email**: `admin@ethioevents.com`
- **Password**: `admin123`

## Verify the Update

To verify the update worked, run this SQL in phpMyAdmin:

```sql
SELECT * FROM users WHERE role = 'super_admin';
```

You should see the super admin user.
