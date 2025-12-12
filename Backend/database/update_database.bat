@echo off
echo Running database update...
echo.

cd C:\xampp\mysql\bin
mysql.exe -u root event_management < "c:\xampp\htdocs\EthioEvents\Backend\database\update_schema.sql"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Database updated successfully!
    echo ========================================
    echo.
    echo You can now login with:
    echo Email: admin@ethioevents.com
    echo Password: admin123
    echo.
) else (
    echo.
    echo ========================================
    echo Error updating database!
    echo ========================================
    echo.
    echo Please update manually using phpMyAdmin.
    echo See SETUP_INSTRUCTIONS.md for details.
    echo.
)

pause
