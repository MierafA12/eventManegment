#!/bin/bash

# EthioEvents Backend API Testing Script
# This script tests all major API endpoints

BASE_URL="http://localhost/EthioEvents/Backend/Controller/EventController.php"

echo "=================================="
echo "EthioEvents API Testing Script"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test 1: Get All Events
echo -e "${BLUE}Test 1: Get All Events${NC}"
curl -s "${BASE_URL}?action=getAll" | jq '.' || echo -e "${RED}Failed${NC}"
echo ""
echo "---"
echo ""

# Test 2: Get Dashboard Stats
echo -e "${BLUE}Test 2: Get Dashboard Statistics${NC}"
curl -s "${BASE_URL}?action=getStats" | jq '.' || echo -e "${RED}Failed${NC}"
echo ""
echo "---"
echo ""

# Test 3: Get Event Trend
echo -e "${BLUE}Test 3: Get Event Trend (Monthly)${NC}"
curl -s "${BASE_URL}?action=getTrend" | jq '.' || echo -e "${RED}Failed${NC}"
echo ""
echo "---"
echo ""

# Test 4: Search Events
echo -e "${BLUE}Test 4: Search Events (query='tech')${NC}"
curl -s "${BASE_URL}?action=search&query=tech" | jq '.' || echo -e "${RED}Failed${NC}"
echo ""
echo "---"
echo ""

# Test 5: Filter Events by Category
echo -e "${BLUE}Test 5: Filter Events (category='Technology')${NC}"
curl -s "${BASE_URL}?action=filter&category=Technology" | jq '.' || echo -e "${RED}Failed${NC}"
echo ""
echo "---"
echo ""

# Test 6: Filter Events by Status
echo -e "${BLUE}Test 6: Filter Events (status='upcoming')${NC}"
curl -s "${BASE_URL}?action=filter&status=upcoming" | jq '.' || echo -e "${RED}Failed${NC}"
echo ""
echo "---"
echo ""

# Test 7: Get Events by Category
echo -e "${BLUE}Test 7: Get Events Grouped by Category${NC}"
curl -s "${BASE_URL}?action=getCategories" | jq '.' || echo -e "${RED}Failed${NC}"
echo ""
echo "---"
echo ""

# Test 8: Combined Search and Filter
echo -e "${BLUE}Test 8: Search and Filter Combined${NC}"
curl -s "${BASE_URL}?action=searchAndFilter&search=event&category=Conference&status=upcoming" | jq '.' || echo -e "${RED}Failed${NC}"
echo ""
echo "---"
echo ""

echo -e "${GREEN}Testing Complete!${NC}"
echo ""
echo "Note: To test Create, Update, and Delete operations, use the admin panel UI or Postman"
echo "      as these require FormData with file uploads."
