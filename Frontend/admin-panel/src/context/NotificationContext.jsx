import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
import { getNotifications, markNotificationRead } from "../api/adminApi";
import { useAuth } from "./AuthContext";

// Create Context
const NotificationContext = createContext();

// Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { jwt, user } = useAuth();

  // Fetch notifications when user/jwt changes
  useEffect(() => {
    if (jwt && user) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [jwt, user]);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications(jwt);
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true, is_read: 1 } : n))
      );

      await markNotificationRead(id, jwt);
      // Optionally refetch to ensure sync
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook
export const useNotification = () => useContext(NotificationContext);
