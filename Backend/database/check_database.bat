@echo off
echo Checking database structure...
echo.

C:\xampp\mysql\bin\mysql.exe -u root -e "USE event_management; DESCRIBE users;"

echo.
echo Checking for super admin user...
echo.

C:\xampp\mysql\bin\mysql.exe -u root -e "USE event_management; SELECT id, email, role, status FROM users WHERE role='super_admin';"

echo.
pause
