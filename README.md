
---

# EthioEvents – Event Management System

EthioEvents is a web-based Event Management System designed to simplify event discovery, registration, and administration in Ethiopia. The platform provides a centralized and secure solution for users to browse events, register, and make payments, while allowing administrators to manage events and monitor registrations efficiently.

---

## 🚀 Features

### 👤 User Features

* User registration and secure login
* Browse and filter events by category and date
* Register for events and pay registration fees
* View registered and upcoming events
* Update personal profile information

### 🛠️ Admin Features

* Secure admin authentication
* Create, edit, and delete events
* Define event details (title, description, category, location, date, time, fee, capacity)
* View user registrations for events
* Monitor event statistics
* Restricted access to Super Admin functionalities

### 🔐 Super Admin Features

* Create, activate, deactivate, and delete admin accounts
* Monitor all events and user registrations
* View system-wide reports and statistics
* Manage access rights and security policies

---

## 🧩 System Actors

* **Super Admin:** Full system control and monitoring
* **Admin:** Event creation and registration management
* **User:** Event browsing, registration, and payment

---

## ⚙️ Technologies Used

### Frontend

* **React** – User interface development
* **Tailwind CSS** – Responsive and modern UI design

### Backend

* **PHP** – Server-side logic
* **JWT Authentication** – Secure login and authorization

### Database

* **MySQL** – Data storage for users, events, registrations, and roles

### Architecture

* **MVC (Model–View–Controller)**

---

## 🔒 Security

* Passwords are stored using hashed encryption
* Role-based access control (User, Admin, Super Admin)
* Secure authentication using JWT
* Restricted access to sensitive system operations

---

## 📊 Non-Functional Requirements

* Fast response time for login, registration, and event loading
* Responsive design for desktop and mobile devices
* User-friendly interface with clear success and error messages
* Easy navigation and filtering of events

---

---

## 🛠️ Installation & Setup

### Prerequisites

* Node.js
* PHP (8+ recommended)
* MySQL
* XAMPP / WAMP / LAMP server

### Steps

1. Clone the repository:

```bash
git clone https://github.com/your-username/ethioevents.git
```

2. Set up the database:

* Create a MySQL database
* Import the provided SQL file

3. Configure backend:

* Update database credentials in PHP config file
* Start Apache & MySQL

4. Run frontend:

```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Purpose of the Project

The goal of EthioEvents is to replace manual and inefficient event registration processes with a secure, automated, and user-friendly system that improves event management and accessibility for users and administrators.

---


