# EthioEvents - Setup & Installation Guide

## Prerequisites
- XAMPP installed with Apache and MySQL running
- Node.js and npm installed
- Git (optional)

---

## Backend Setup

### 1. Database Setup

1. Start XAMPP and ensure MySQL is running
2. Open phpMyAdmin: `http://localhost/phpmyadmin`
3. Run the database schema:
   - Navigate to Import or SQL tab
   - Execute the SQL file: `Backend/database/schema.sql`
   - This will create:
     - Database: `event_management`
     - Tables: `events`, `admins`, `users`, `event_registrations`
     - Sample admin user (username: admin, password: admin123)

### 2. Backend Configuration

1. Navigate to `Backend/config/database.php`
2. Verify database credentials:
   ```php
   private $host = "localhost";
   private $db_name = "event_management";
   private $username = "root";
   private $password = "";
   ```

3. Ensure the uploads directory exists and is writable:
   ```
   Backend/uploads/
   ```

### 3. Test Backend API

Open your browser or use cURL to test:
```
http://localhost/EthioEvents/Backend/Controller/EventController.php?action=getAll
```

You should see an empty array `[]` or existing events in JSON format.

---

## Frontend Setup

### 1. Admin Panel Setup

1. Navigate to the admin panel directory:
   ```bash
   cd Frontend/admin-panel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application:
   - The terminal will show the local URL (typically `http://localhost:5173`)
   - Open this URL in your browser

### 2. Login Credentials

Use the default admin credentials:
- **Username:** admin@ethioevents.com
- **Password:** admin123

---

## Project Structure

```
EthioEvents/
├── Backend/
│   ├── Controller/
│   │   └── EventController.php     # Main event API controller
│   ├── Model/
│   │   └── eventModel.php          # Event database operations
│   ├── config/
│   │   └── database.php            # Database connection
│   ├── database/
│   │   └── schema.sql              # Database schema
│   ├── uploads/                    # Event images storage
│   └── API_DOCUMENTATION.md        # API documentation
├── Frontend/
│   └── admin-panel/
│       ├── src/
│       │   ├── pages/admin/
│       │   │   ├── AdminDashboard.jsx    # Dashboard with stats & graph
│       │   │   ├── CreateEvents.jsx      # Create new events
│       │   │   └── ManageEvents.jsx      # View, edit, delete events
│       │   └── components/
│       └── package.json
├── todo.md                          # Implementation checklist
└── roadmap.md                       # Project roadmap
```

---

## Features Implemented

### Backend ✅
- ✅ Complete CRUD operations for events
- ✅ Image upload and storage
- ✅ Search functionality (by title/description)
- ✅ Filter functionality (by category, type, status, date range)
- ✅ Combined search and filter
- ✅ Dashboard statistics (total, upcoming, past events)
- ✅ Monthly event trend data for charts
- ✅ Category-based event grouping

### Frontend ✅
- ✅ **Admin Dashboard**
  - Statistics cards (Total, Upcoming, Past events)
  - Monthly events trend line graph (Recharts)
  - Responsive design
  
- ✅ **Create Events Page**
  - Complete event creation form
  - Image upload with preview
  - Conditional fields (Physical/Online)
  - Form validation
  - Success/error feedback
  
- ✅ **Manage Events Page**
  - Display all events in table format
  - Real-time search functionality
  - Filter by status (All, Upcoming, Past)
  - Filter by category
  - Edit event (with modal)
  - Delete event (with confirmation)
  - Responsive table design

---

## Usage Guide

### Creating an Event

1. Navigate to "Create Events" from the admin panel sidebar
2. Fill in all required fields:
   - Title
   - Description
   - Category
   - Event Type (Physical/Online)
   - Location (for Physical) or Event Link (for Online)
   - Date & Time
   - Registration Fee
   - Capacity (for Physical events)
3. Upload an event image (optional)
4. Click "Create Event"
5. Wait for success confirmation

### Managing Events

1. Navigate to "Manage Events"
2. Use the search bar to find specific events
3. Use filters to narrow down results:
   - Status filter (All/Upcoming/Past)
   - Category filter
4. Click "Edit" to modify an event
5. Click "Delete" to remove an event (with confirmation)

### Viewing Dashboard

1. Navigate to "Dashboard" (default page)
2. View statistics cards at the top
3. See monthly event trends in the line graph below
4. Graph shows events created per month for the current year

---

## API Endpoints Summary

All endpoints use: `http://localhost/EthioEvents/Backend/Controller/EventController.php`

- `?action=getAll` - Get all events
- `?action=getOne&id={id}` - Get single event
- `?action=create` - Create event (POST with FormData)
- `?action=update` - Update event (POST with FormData)
- `?action=delete` - Delete event (POST with id)
- `?action=getStats` - Get dashboard statistics
- `?action=getTrend` - Get monthly event trend
- `?action=search&query={term}` - Search events
- `?action=filter&...` - Filter events
- `?action=searchAndFilter&...` - Combined search and filter
- `?action=getCategories` - Get event counts by category

See `Backend/API_DOCUMENTATION.md` for detailed API documentation.

---

## Troubleshooting

### Backend Issues

**Database Connection Error:**
- Ensure MySQL is running in XAMPP
- Verify database credentials in `config/database.php`
- Check if database `event_management` exists

**Image Upload Not Working:**
- Check if `Backend/uploads/` directory exists
- Ensure directory has write permissions (chmod 777 on Linux/Mac)

**CORS Errors:**
- Backend has CORS enabled by default
- Check browser console for specific errors

### Frontend Issues

**API Not Responding:**
- Ensure XAMPP Apache is running
- Verify the backend URL in API calls
- Check browser console for network errors

**Blank Page:**
- Check browser console for JavaScript errors
- Ensure all npm dependencies are installed
- Try clearing browser cache

**npm install fails:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure you have the latest Node.js version

---

## Development Notes

1. **Hot Reload**: Frontend has hot reload enabled - changes reflect immediately
2. **Image Paths**: Images are served from `Backend/uploads/` - ensure Apache has access
3. **DateTime**: All datetime values are in MySQL DATETIME format
4. **Security**: In production, implement proper authentication and input sanitization
5. **Testing**: Test all CRUD operations before deployment

---

## Next Steps

Consider implementing:
- User authentication with JWT tokens
- Role-based access control
- Event registration system for users
- Email notifications
- Payment integration
- Export events to CSV/PDF
- Event analytics and reporting
- Multi-language support
- Event calendar view
- Advanced image management (cropping, resizing)

---

## Support

For issues or questions:
1. Check the API documentation: `Backend/API_DOCUMENTATION.md`
2. Review the todo list: `todo.md`
3. Check browser and server error logs

---

**Last Updated:** December 12, 2024
