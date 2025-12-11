import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileBox from "../component/profileBox";

export default function Header2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg shadow-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">

        <Link to="/" className="text-2xl font-bold text-primary">
          Ethio Events
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/events" className="text-primary hover:text-secondary font-bold">
            Events
          </Link>
          <Link to="/payment" className="text-primary hover:text-secondary font-bold">
            Payment
          </Link>

          <Link to="/profile">
            <ProfileBox size="sm" />
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 text-primary"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-bg shadow-lg absolute top-full left-0 right-0">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <Link to="/events" className="block text-primary font-bold">Events</Link>
            <Link to="/payment" className="block text-primary font-bold">Payment</Link>
            <Link to="/profile" className="block text-primary font-bold">Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
