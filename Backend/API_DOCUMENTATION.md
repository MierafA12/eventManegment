# EthioEvents Backend API Documentation

## Base URL
```
http://localhost/EthioEvents/Backend/Controller/EventController.php
```

## API Endpoints

### 1. Get All Events
**Endpoint:** `?action=getAll`  
**Method:** GET  
**Description:** Retrieves all events from the database

**Response:**
```json
[
  {
    "id": 1,
    "title": "Event Title",
    "description": "Event description",
    "category": "Conference",
    "eventType": "Physical",
    "location": "Addis Ababa",
    "eventLink": null,
    "datetime": "2024-12-25 10:00:00",
    "fee": 500.00,
    "capacity": 100,
    "image": "1733954621_event.jpg",
    "status": "active",
    "created_at": "2024-12-12 10:00:00",
    "updated_at": "2024-12-12 10:00:00"
  }
]
```

### 2. Get Single Event
**Endpoint:** `?action=getOne&id={id}`  
**Method:** GET  
**Description:** Retrieves a single event by ID

**Parameters:**
- `id` (required) - Event ID

**Response:**
```json
{
  "id": 1,
  "title": "Event Title",
  ...
}
```

### 3. Create Event
**Endpoint:** `?action=create`  
**Method:** POST  
**Content-Type:** multipart/form-data  
**Description:** Creates a new event

**Form Data:**
- `title` (required) - Event title
- `description` (required) - Event description
- `category` (required) - Event category (Conference, Workshop, Music, Technology, Culture)
- `eventType` (required) - Physical or Online
- `location` (required for Physical events) - Event location
- `eventLink` (required for Online events) - Meeting link
- `datetime` (required) - Event date and time (YYYY-MM-DD HH:MM:SS)
- `fee` (required) - Registration fee in ETB
- `capacity` (required for Physical events) - Maximum attendees
- `image` (optional) - Event image file

**Response:**
```json
{
  "success": true,
  "message": "Event created"
}
```

### 4. Update Event
**Endpoint:** `?action=update`  
**Method:** POST  
**Content-Type:** multipart/form-data  
**Description:** Updates an existing event

**Form Data:**
- `id` (required) - Event ID to update
- All other fields from Create Event (as needed)

**Response:**
```json
{
  "success": true,
  "message": "Event updated"
}
```

### 5. Delete Event
**Endpoint:** `?action=delete`  
**Method:** POST  
**Content-Type:** multipart/form-data  
**Description:** Deletes an event

**Form Data:**
- `id` (required) - Event ID to delete

**Response:**
```json
{
  "success": true,
  "message": "Event deleted"
}
```

### 6. Get Dashboard Statistics
**Endpoint:** `?action=getStats`  
**Method:** GET  
**Description:** Retrieves dashboard statistics

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalEvents": 15,
    "upcomingEvents": 8,
    "pastEvents": 7
  }
}
```

### 7. Get Event Trend (Monthly)
**Endpoint:** `?action=getTrend`  
**Method:** GET  
**Description:** Retrieves monthly event statistics for the current year

**Response:**
```json
{
  "success": true,
  "eventData": [
    { "month": "January", "events": 5 },
    { "month": "February", "events": 8 },
    { "month": "March", "events": 12 }
  ]
}
```

### 8. Search Events
**Endpoint:** `?action=search&query={searchTerm}`  
**Method:** GET  
**Description:** Searches events by title or description

**Parameters:**
- `query` (required) - Search term

**Response:**
```json
{
  "success": true,
  "events": [...]
}
```

### 9. Filter Events
**Endpoint:** `?action=filter&category={cat}&eventType={type}&status={stat}&startDate={start}&endDate={end}`  
**Method:** GET  
**Description:** Filters events by various criteria

**Parameters:**
- `category` (optional) - Event category
- `eventType` (optional) - Physical or Online
- `status` (optional) - upcoming or past
- `startDate` (optional) - Start date (YYYY-MM-DD)
- `endDate` (optional) - End date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "events": [...]
}
```

### 10. Search and Filter Combined
**Endpoint:** `?action=searchAndFilter&search={term}&category={cat}&status={stat}...`  
**Method:** GET  
**Description:** Combines search and filter functionality

**Parameters:**
- `search` (optional) - Search term
- All filter parameters from Filter Events

**Response:**
```json
{
  "success": true,
  "events": [...]
}
```

### 11. Get Events by Category
**Endpoint:** `?action=getCategories`  
**Method:** GET  
**Description:** Retrieves event count grouped by category

**Response:**
```json
{
  "success": true,
  "categories": [
    { "category": "Technology", "count": 15 },
    { "category": "Music", "count": 8 }
  ]
}
```

---

## Testing with cURL

### Create Event
```bash
curl -X POST "http://localhost/EthioEvents/Backend/Controller/EventController.php?action=create" \
  -F "title=Tech Conference 2024" \
  -F "description=Annual technology conference" \
  -F "category=Technology" \
  -F "eventType=Physical" \
  -F "location=Addis Ababa" \
  -F "datetime=2024-12-25 10:00:00" \
  -F "fee=500" \
  -F "capacity=200" \
  -F "image=@/path/to/image.jpg"
```

### Get All Events
```bash
curl "http://localhost/EthioEvents/Backend/Controller/EventController.php?action=getAll"
```

### Search Events
```bash
curl "http://localhost/EthioEvents/Backend/Controller/EventController.php?action=search&query=tech"
```

### Filter Events
```bash
curl "http://localhost/EthioEvents/Backend/Controller/EventController.php?action=filter&category=Technology&status=upcoming"
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Server Error

---

## Notes

1. **Image Upload**: Images are stored in `/Backend/uploads/` with timestamp prefix
2. **CORS**: Backend has CORS enabled for development
3. **Date Format**: All dates should be in `YYYY-MM-DD HH:MM:SS` format
4. **File Size**: Consider implementing file size limits for image uploads
5. **Validation**: Backend performs validation on required fields
