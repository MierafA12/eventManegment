# EthioEvents - Event Management Platform

> A comprehensive event management system for creating, managing, and tracking events with a powerful admin dashboard.

![Status](https://img.shields.io/badge/status-Phase%201%20%26%202%20Complete-success)
![Backend](https://img.shields.io/badge/backend-PHP-777BB4)
![Frontend](https://img.shields.io/badge/frontend-React-61DAFB)
![Database](https://img.shields.io/badge/database-MySQL-4479A1)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## ✨ Features

### Backend
- ✅ Full CRUD operations for events
- ✅ Advanced search functionality (by title/description)
- ✅ Multi-criteria filtering (category, type, status, date range)
- ✅ Image upload and management
- ✅ Dashboard analytics and statistics
- ✅ Monthly event trend tracking
- ✅ RESTful API architecture
- ✅ CORS-enabled for development

### Frontend - Admin Panel
- ✅ **Dashboard**
  - Real-time statistics cards
  - Monthly events trend visualization (line graph)
  - Responsive design
  
- ✅ **Create Events**
  - Comprehensive event creation form
  - Image upload with preview
  - Conditional fields (Physical/Online events)
  - Client-side validation
  
- ✅ **Manage Events**
  - Searchable events table
  - Filter by status and category
  - Edit events with modal
  - Delete with confirmation
  - Auto-refresh after operations

---

## 🛠 Tech Stack

### Backend
- **Language:** PHP 7.4+
- **Database:** MySQL 8.0+
- **Server:** Apache (XAMPP)
- **Architecture:** MVC Pattern

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **HTTP Client:** Fetch API

---

## 🚀 Quick Start

### Prerequisites
- XAMPP (or Apache + MySQL + PHP)
- Node.js 16+ and npm
- Git (optional)

### Installation

1. **Clone or download the project**
   ```bash
   cd C:/xampp/htdocs
   git clone <repository-url> EthioEvents
   # OR download and extract to C:/xampp/htdocs/EthioEvents
   ```

2. **Setup Database**
   - Start XAMPP (Apache + MySQL)
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Import: `Backend/database/schema.sql`

3. **Setup Backend**
   - Backend is ready to use (no additional setup needed)
   - Ensure `Backend/uploads/` directory exists and is writable

4. **Setup Frontend**
   ```bash
   cd Frontend/admin-panel
   npm install
   npm run dev
   ```

5. **Access the Application**
   - Frontend: `http://localhost:5173` (or port shown in terminal)
   - Backend API: `http://localhost/EthioEvents/Backend/Controller/EventController.php`

### Default Admin Credentials
```
Username: admin@ethioevents.com
Password: admin123
```

📖 **For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)**

---

## 📚 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Comprehensive installation and configuration
- **[API Documentation](Backend/API_DOCUMENTATION.md)** - Complete API reference
- **[Todo List](todo.md)** - Implementation progress tracker
- **[Roadmap](roadmap.md)** - Project roadmap

---

## 📁 Project Structure

```
EthioEvents/
├── Backend/
│   ├── Controller/
│   │   └── EventController.php      # Main event API controller (12 endpoints)
│   ├── Model/
│   │   └── eventModel.php           # Event database operations
│   ├── config/
│   │   └── database.php             # Database connection
│   ├── database/
│   │   └── schema.sql               # Database schema
│   ├── uploads/                     # Event images storage
│   ├── test_api.bat                 # Windows API test script
│   ├── test_api.sh                  # Linux/Mac API test script
│   └── API_DOCUMENTATION.md         # API documentation
│
├── Frontend/
│   └── admin-panel/
│       ├── src/
│       │   ├── pages/admin/
│       │   │   ├── AdminDashboard.jsx    # Dashboard with stats & graph
│       │   │   ├── CreateEvents.jsx      # Event creation form
│       │   │   └── ManageEvents.jsx      # Events management table
│       │   ├── components/               # Reusable components
│       │   └── layouts/                  # Layout components
│       └── package.json
│
├── SETUP_GUIDE.md                   # Setup and installation guide
├── README.md                        # This file
├── todo.md                          # Implementation checklist
└── roadmap.md                       # Project roadmap
```

---

## 🔌 API Endpoints

Base URL: `http://localhost/EthioEvents/Backend/Controller/EventController.php`

### Events Management
| Endpoint | Method | Description |
|----------|--------|-------------|
| `?action=getAll` | GET | Get all events |
| `?action=getOne&id={id}` | GET | Get single event |
| `?action=create` | POST | Create new event |
| `?action=update` | POST | Update event |
| `?action=delete` | POST | Delete event |

### Search & Filter
| Endpoint | Method | Description |
|----------|--------|-------------|
| `?action=search&query={term}` | GET | Search events |
| `?action=filter&category={cat}&status={stat}...` | GET | Filter events |
| `?action=searchAndFilter&...` | GET | Combined search & filter |

### Analytics
| Endpoint | Method | Description |
|----------|--------|-------------|
| `?action=getStats` | GET | Dashboard statistics |
| `?action=getTrend` | GET | Monthly event trend |
| `?action=getCategories` | GET | Events by category |

📖 **For detailed API documentation, see [Backend/API_DOCUMENTATION.md](Backend/API_DOCUMENTATION.md)**

---

## 🖼 Screenshots

### Admin Dashboard
![Dashboard](docs/dashboard-preview.png)
*Real-time statistics and monthly event trends*

### Create Event
![Create Event](docs/create-event-preview.png)
*Comprehensive event creation form with image upload*

### Manage Events
![Manage Events](docs/manage-events-preview.png)
*Search, filter, edit, and delete events*

---

## 🗺 Roadmap

### ✅ Completed (Phase 1 & 2)
- Backend API with full CRUD operations
- Search and filter functionality
- Image upload system
- Admin dashboard with analytics
- Event creation and management UI

### 🚧 In Progress (Phase 3)
- [ ] Comprehensive testing
- [ ] Unit tests for backend
- [ ] Integration tests
- [ ] UI/UX testing

### 📅 Planned (Phase 4+)
- [ ] User registration and event booking
- [ ] Payment integration
- [ ] Email notifications
- [ ] Event calendar view
- [ ] Export events (CSV/PDF)
- [ ] Advanced analytics
- [ ] Mobile app

---

## 🧪 Testing

### Backend API Testing

**Windows:**
```bash
cd Backend
test_api.bat
```

**Linux/Mac:**
```bash
cd Backend
chmod +x test_api.sh
./test_api.sh
```

### Frontend Testing
```bash
cd Frontend/admin-panel
npm run dev
```
Then manually test all features through the UI.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Implementation Status

### Backend (100% Complete) ✅
- [x] Database schema
- [x] CRUD operations
- [x] Image upload
- [x] Search & filter
- [x] Dashboard statistics
- [x] API documentation

### Frontend (100% Complete) ✅
- [x] Dashboard page
- [x] Create events page
- [x] Manage events page
- [x] Search & filter UI
- [x] Edit/delete events
- [x] Responsive design

### Testing (0% Complete) ⏳
- [ ] Backend API tests
- [ ] Frontend component tests
- [ ] Integration tests
- [ ] User acceptance testing

### Deployment (0% Complete) ⏳
- [ ] Production database setup
- [ ] Backend deployment
- [ ] Frontend build & deployment
- [ ] SSL/HTTPS configuration

---

## 📄 License

This project is currently unlicensed. All rights reserved.

---

## 👥 Authors

- Your Name - Initial work

---

## 🙏 Acknowledgments

- Recharts for the beautiful line charts
- Tailwind CSS for the styling framework
- The React community for excellent documentation

---

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Last Updated:** December 12, 2024  
**Version:** 1.0.0  
**Status:** Phase 1 & 2 Complete ✅
