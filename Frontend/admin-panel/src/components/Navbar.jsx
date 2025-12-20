import { FiMail, FiBell, FiMenu } from "react-icons/fi";
import ProfileBox from "./profileBox";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isMobileOpen, setMobileOpen }) {
  const { user } = useAuth();     
  const { notifications } = useNotification();
  const navigate = useNavigate();
  const role = user?.role;

  // Only show notifications for this user's role
  const userNotifications = notifications.filter((n) => n.role === role);
  const unreadCount = userNotifications.filter((n) => !n.read).length;

  const dashboardTitle =
    role === "superadmin"
      ? "Super Admin Dashboard"
      : "Admin Dashboard";

  const handleNotificationClick = () => {
    if (!user) {
      navigate("/login"); 
    } else {
      if (role === "superadmin") navigate("/superadmin/notifications");
      else if (role === "admin") navigate("/admin/notifications");
      else navigate("/participant/notifications");
    }
  };

  return (
    <nav className="w-full h-16 bg-primary text-white flex items-center justify-between px-6 shadow-md relative">
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!isMobileOpen)}
        className="md:hidden text-white hover:text-secondary transition"
      >
        <FiMenu size={26} />
      </button>

      {/* Dynamic role title */}
      <h1 className="text-xl font-semibold tracking-wide hidden md:block">
        {dashboardTitle}
      </h1>

      <div className="flex items-center gap-6 relative">
        <FiMail size={20} className="hover:text-secondary cursor-pointer" />
        
        {/* Bell with unread count */}
        <div className="relative cursor-pointer" onClick={handleNotificationClick}>
          <FiBell size={20} className="hover:text-secondary" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>

        <ProfileBox size="md" role={role} />
      </div>
    </nav>
  );
}
