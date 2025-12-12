# 🔍 Debugging Server Error - Step by Step

## The error is still happening because the database hasn't been updated yet!

### STEP 1: Check Database Status

Open this page in your browser:
```
http://localhost/EthioEvents/Backend/public/diagnostic.php
```

This will show you:
- ✓ If the database is connected
- ✓ If the `role` and `status` columns exist
- ✓ If the super admin user exists
- ✓ Exact SQL commands to fix any issues

---

### STEP 2: Update the Database

Based on what you see in the diagnostic page, run the appropriate fix:

#### Option A: If columns are missing

1. Open **phpMyAdmin**: http://localhost/phpmyadmin
2. Click on **`event_management`** database
3. Click the **SQL** tab
4. Run this SQL:

```sql
USE event_management;

-- Add role column
ALTER TABLE users ADD COLUMN role ENUM('participant', 'admin', 'super_admin') DEFAULT 'participant' AFTER phone;

-- Add status column  
ALTER TABLE users ADD COLUMN status ENUM('active', 'inactive') DEFAULT 'active' AFTER role;

-- Add full_name column
ALTER TABLE users ADD COLUMN full_name VARCHAR(255) AFTER id;

-- Add username column
ALTER TABLE users ADD COLUMN username VARCHAR(100) AFTER full_name;
```

#### Option B: If admin user is missing

Run this SQL in phpMyAdmin:

```sql
INSERT INTO users (full_name, username, fullname, email, password, role, status) 
VALUES ('Super Admin', 'superadmin', 'Super Admin', 'admin@ethioevents.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', 'active')
ON DUPLICATE KEY UPDATE role='super_admin', status='active';
```

---

### STEP 3: Verify the Fix

1. Refresh the diagnostic page: http://localhost/EthioEvents/Backend/public/diagnostic.php
2. You should see all green checkmarks ✓
3. It should show the admin user exists

---

### STEP 4: Test Login

1. Go to your admin panel: http://localhost:5173
2. Login with:
   - Email: `admin@ethioevents.com`
   - Password: `admin123`

The "Server error" should be gone! ✨

---

## Quick Reference

### Diagnostic Page
```
http://localhost/EthioEvents/Backend/public/diagnostic.php
```

### phpMyAdmin
```
http://localhost/phpmyadmin
```

### Admin Panel
```
http://localhost:5173
```

---

## If you still get errors...

Check the diagnostic page - it will tell you exactly what's wrong and give you the SQL to fix it!
