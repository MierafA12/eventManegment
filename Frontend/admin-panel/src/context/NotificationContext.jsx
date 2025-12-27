import React, { createContext, useContext, useState } from "react";

// Create Context
const NotificationContext = createContext();

// Provider
export const NotificationProvider = ({ children }) => {
  // Mock notifications (replace with API later)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Event Created",
      message: "Admin John created 'Addis Tech Summit 2025'.",
      role: "superadmin",
      read: false,
    },
    {
      id: 2,
      title: "Event Capacity Full",
      message: "'Ethio Music Festival' is now full.",
      role: "admin",
      read: false,
    },
    {
      id: 3,
      title: "Download Ticket",
      message: "You have an undownloaded ticket for 'Startup Pitch Day'.",
      role: "participant",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook
export const useNotification = () => useContext(NotificationContext);
