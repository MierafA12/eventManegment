import { FiMail, FiBell, FiMenu } from "react-icons/fi";
import ProfileBox from "./profileBox";

export default function Navbar({ isMobileOpen, setMobileOpen }) {
  return (
    <nav className="w-full h-16 bg-primary text-white flex items-center justify-between px-6 shadow-md">

      {/* Show hamburger only on mobile */}
      <button
        onClick={() => setMobileOpen(!isMobileOpen)}
        className="md:hidden text-white hover:text-secondary transition"
      >
        <FiMenu size={26} />
      </button>

      <h1 className="text-xl font-semibold tracking-wide hidden md:block">
        EthioEvents Admin
      </h1>

      <div className="flex items-center gap-6">
        <FiMail size={20} className="hover:text-secondary cursor-pointer" />
        <FiBell size={20} className="hover:text-secondary cursor-pointer" />
        <ProfileBox size="md" />
      </div>
    </nav>
  );
}
