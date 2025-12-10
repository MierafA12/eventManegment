import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg shadow-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Ethio Events
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-primary hover:text-secondary">
            Home
          </Link>
          <Link to="/about" className="text-primary font-bold">
            About
          </Link>
          <Link to="/events" className="text-secondary hover:text-primary">
            Events
          </Link>
          <Link to="/contact" className="text-secondary hover:text-primary">
            Contact
          </Link>

          <Link to="/login">
            <button className="bg-primary text-text1 px-6 py-2 rounded-full hover:bg-buttonHover transition">
              Login
            </button>
          </Link>
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

            <Link to="/login">
              <button className="w-full bg-primary text-text1 py-2 rounded-full hover:bg-buttonHover">
                Login
              </button>
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}
