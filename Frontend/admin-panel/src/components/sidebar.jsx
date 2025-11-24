import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiActivity,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import ProfileBox from "./profileBox";

export default function Sidebar({ collapsed, mobileOpen, setMobileOpen }) {
  const menu = [
    { name: "Overview", icon: <FiHome />, path: "/admin/dashboard" },
    { name: "Events", icon: <FiCalendar />, path: "/admin/events" },
    { name: "Registrations", icon: <FiUsers />, path: "/admin/registrations" },
    { name: "Activity", icon: <FiActivity />, path: "/admin/activity" },
    { name: "Settings", icon: <FiSettings />, path: "/admin/settings" },
  ];

  return (
    <aside
      className={`
        bg-text1 shadow-lg border-r border-gray-200 h-screen fixed md:relative z-40
        flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${collapsed ? "w-20 px-3" : "w-64 px-4"}
      `}
    >

      {/* Profile section */}
      <div className="w-full mt-6 flex justify-center">
        {collapsed ? (
          <ProfileBox size="sm" />
        ) : (
          <ProfileBox size="lg" />
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 mt-10">
        <ul className="space-y-3">
          {menu.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                onClick={() => setMobileOpen(false)} // close on mobile
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${isActive ? "bg-secondary text-text1" : "hover-buttonHover"}`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {!collapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div className="absolute bottom-4 left-4 w-[85%]">
        <button className="flex items-center  text-error px-4 py-2 rounded-lg hover:bg-red-50 w-full transition">
          <FiLogOut size={18} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
