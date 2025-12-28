import { Menu, X, Bell, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; 
import { useTheme } from "../context/ThemeContext.jsx"; 
import ProfileBox from "./profileBox";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth(); 
  const { isDark, toggleTheme } = useTheme(); 

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg shadow-md z-50 dark:bg-bgDark">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-primary dark:text-text1">
          Ethio Events
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-primary hover:text-secondary font-bold dark:text-text1">Home</Link>

            {!user && <Link to="/about" className="text-primary hover:text-secondary font-bold dark:text-text1">About</Link>}

            <Link to="/events" className="text-primary hover:text-secondary font-bold dark:text-text1">Events</Link>
            <Link to="/contact" className="text-primary hover:text-secondary font-bold dark:text-text1">Contact</Link>

            {!user && (
              <Link to="/login">
                <button className="bg-primary text-text1 px-6 py-2 rounded-full hover:bg-buttonHover transition">
                  Login
                </button>
              </Link>
            )}

            {user && (
              <>
                <Link to="/mytickets" className="text-primary hover:text-secondary font-bold dark:text-text1">Mytickets</Link>
                <Link to="/notifications">
                  <Bell size={24} className="text-primary hover:text-secondary dark:text-text1" />
                </Link>
                <Link to="/profile">
                  <ProfileBox size="sm" />
                </Link>
              </>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary/10 dark:bg-secondary/20 hover:bg-secondary/20 transition ml-6"
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800 dark:text-white" />}
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 text-primary dark:text-text1"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-bg dark:bg-bgDark shadow-lg absolute top-full left-0 right-0">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <Link to="/" className="block text-primary dark:text-text1">Home</Link>
            {!user && <Link to="/about" className="block text-primary dark:text-text1">About</Link>}
            <Link to="/events" className="block text-primary dark:text-text1">Events</Link>
            <Link to="/contact" className="block text-primary dark:text-text1">Contact</Link>
            {!user && (
              <Link to="/login">
                <button className="w-full bg-primary text-text1 py-2 rounded-full hover:bg-buttonHover">
                  Login
                </button>
              </Link>
            )}

            {user && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link to="/mytickets" className="text-primary hover:text-secondary font-bold dark:text-text1">Mytickets</Link>
                <Link to="/notifications">
                  <Bell size={26} className="text-primary dark:text-text1" />
                </Link>
                <Link to="/profile">
                  <ProfileBox size="sm" />
                </Link>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 mt-4 p-2 rounded-full bg-secondary/10 dark:bg-secondary/20 hover:bg-secondary/20 transition w-full justify-center"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800 dark:text-white" />}
              <span className="text-sm dark:text-text1">{isDark ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
