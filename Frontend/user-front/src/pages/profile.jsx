import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import { Edit2, ArrowLeft } from "lucide-react";
import * as Icons from "react-icons/fi";
import ProfileBox from "../component/profileBox.jsx";

export default function Profile() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleEditProfile = () => {
    navigate("/editProfile");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-lightBg flex justify-center px-4 py-6 mt-8">
      <div className="bg-bg rounded-3xl shadow-2xl w-full max-w-md p-6 relative">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-primary font-semibold hover:text-buttonHover"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* ProfileBox with Edit Icon */}
        <div className="relative w-fit mx-auto -mt-16">
          <ProfileBox size="lg" />

          <button
            onClick={handleEditProfile}
            className="absolute bottom-1 right-1 bg-primary p-2 rounded-full shadow-lg hover:bg-buttonHover transition"
          >
            <Edit2 size={18} className="text-text1" />
          </button>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-center text-primary mt-4">
          {user.fullname || user.username}
        </h2>

        {/* Info Boxes */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center p-3 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Full Name</span>
            <span className="text-secondary">{user.fullname || "Not set"}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Email</span>
            <span className="text-secondary">{user.email}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Username</span>
            <span className="text-secondary">{user.username}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Date of Birth</span>
            <span className="text-secondary">{user.dob || "Not set"}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Phone</span>
            <span className="text-secondary">{user.phone || "Not set"}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-text1 py-3 rounded-full font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
        >
          <Icons.FiLogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
