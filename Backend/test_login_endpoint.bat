@echo off
echo.
echo ================================================
echo Testing Login Endpoint
echo ================================================
echo.

curl -X POST "http://localhost/EthioEvents/Backend/public/login" ^
-H "Content-Type: application/json" ^
-d "{\"email\":\"admin@ethioevents.com\",\"password\":\"admin123\"}"

echo.
echo.
echo ================================================
echo Test Complete
echo ================================================
echo.
pause
