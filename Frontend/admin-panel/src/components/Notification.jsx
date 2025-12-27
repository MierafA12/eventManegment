import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { FiCheck, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const { user } = useAuth();
  const role = user?.role;
  const { notifications, markAsRead } = useNotification();
  const navigate = useNavigate();

  const userNotifications = notifications.filter((n) => n.role === role);
  const unreadCount = userNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-lightBg p-6 md:p-8  dark:bg-bgDark dark:text-secondary">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white text-primary shadow hover:bg-secondary transition dark:bg-bgDark dark:text-secondary"
        >
          <FiArrowLeft size={24} className="text-primary dark:text-secondary" />
        </button>
        <h1 className="text-3xl font-bold text-primary dark:text-secondary">Notifications</h1>
      </div>

      {/* Unread summary */}
      <p className="text-gray-600 mb-6 dark:text-text1">
        {unreadCount > 0
          ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}.`
          : "You're all caught up!"}
      </p>

      {/* Notifications list */}
      <div className="space-y-4">
        {userNotifications.length === 0 && (
          <p className="text-gray-500 text-center dark:text-text1">No notifications yet.</p>
        )}
        {userNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-lg shadow flex justify-between items-start transition
              ${
                notif.read
                  ? "bg-white hover:bg-lightBg dark:text-secondary"
                  : "bg-secondary/10 border-l-4 border-primary dark:border-secondary"
              }`}
          >
            <div>
              <h3 className="font-semibold text-lg text-primary dark:text-secondary">{notif.title}</h3>
              <p className="text-gray-700 mt-1 dark:text-text1">{notif.message}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              {notif.read ? (
                <FiCheck className="text-success" size={20} />
              ) : (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="text-primary font-medium hover:text-primary/80 transition dark:text-secondary"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
