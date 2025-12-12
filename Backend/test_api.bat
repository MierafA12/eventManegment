@echo off
REM EthioEvents Backend API Testing Script for Windows
REM This script tests all major API endpoints

set BASE_URL=http://localhost/EthioEvents/Backend/Controller/EventController.php

echo ==================================
echo EthioEvents API Testing Script
echo ==================================
echo.

REM Test 1: Get All Events
echo Test 1: Get All Events
curl -s "%BASE_URL%?action=getAll"
echo.
echo ---
echo.

REM Test 2: Get Dashboard Stats
echo Test 2: Get Dashboard Statistics
curl -s "%BASE_URL%?action=getStats"
echo.
echo ---
echo.

REM Test 3: Get Event Trend
echo Test 3: Get Event Trend (Monthly)
curl -s "%BASE_URL%?action=getTrend"
echo.
echo ---
echo.

REM Test 4: Search Events
echo Test 4: Search Events (query='tech')
curl -s "%BASE_URL%?action=search&query=tech"
echo.
echo ---
echo.

REM Test 5: Filter Events by Category
echo Test 5: Filter Events (category='Technology')
curl -s "%BASE_URL%?action=filter&category=Technology"
echo.
echo ---
echo.

REM Test 6: Filter Events by Status
echo Test 6: Filter Events (status='upcoming')
curl -s "%BASE_URL%?action=filter&status=upcoming"
echo.
echo ---
echo.

REM Test 7: Get Events by Category
echo Test 7: Get Events Grouped by Category
curl -s "%BASE_URL%?action=getCategories"
echo.
echo ---
echo.

REM Test 8: Combined Search and Filter
echo Test 8: Search and Filter Combined
curl -s "%BASE_URL%?action=searchAndFilter&search=event&category=Conference&status=upcoming"
echo.
echo ---
echo.

echo Testing Complete!
echo.
echo Note: To test Create, Update, and Delete operations, use the admin panel UI
echo       or Postman as these require FormData with file uploads.
echo.
pause
