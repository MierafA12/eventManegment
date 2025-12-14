import { Menu, X, Bell } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx"; 
import ProfileBox from "./profileBox";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth(); // <-- detect logged in user

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg shadow-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Ethio Events
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-primary hover:text-secondary font-bold">Home</Link>
          <Link to="/about" className="text-primary hover:text-secondary font-bold">About</Link>
          <Link to="/events" className="text-primary hover:text-secondary font-bold">Events</Link>
          <Link to="/contact" className="text-primary hover:text-secondary font-bold">Contact</Link>

          {/* If NOT logged in → show Login */}
          {!user && (
            <Link to="/login">
              <button className="bg-primary text-text1 px-6 py-2 rounded-full hover:bg-buttonHover transition">
                Login
              </button>
            </Link>
          )}

          {/* If logged in → show Notification + Profile */}
          {user && (
            <div className="flex items-center space-x-5">

              <Link to="/mytickets" className="text-primary hover:text-secondary font-bold">Mytickets</Link>
               <Link to="/notifications">
                <Bell size={24} className="text-primary hover:text-secondary" />
              </Link>
              <Link to="/profile">
                <ProfileBox size="sm" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 text-primary"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-bg shadow-lg absolute top-full left-0 right-0">
          <div className="container mx-auto px-4 py-6 space-y-4">

            <Link to="/" className="block text-secondary">Home</Link>
            <Link to="/about" className="block text-primary font-bold">About</Link>
            <Link to="/events" className="block text-secondary">Events</Link>
            <Link to="/contact" className="block text-secondary">Contact</Link>

            {/* If NOT logged in → show Login */}
            {!user && (
              <Link to="/login">
                <button className="w-full bg-primary text-text1 py-2 rounded-full hover:bg-buttonHover">
                  Login
                </button>
              </Link>
            )}

            {/* If logged in → show profile + notifications */}
            {user && (
              
              <div className="flex items-center justify-between pt-4 border-t">
                <Link to="/mytickets" className="text-primary hover:text-secondary font-bold">Mytickets</Link>
                <Link to="/notifications">
                  <Bell size={26} className="text-primary" />
                </Link>

                <Link to="/profile">
                  <ProfileBox size="sm" />
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
