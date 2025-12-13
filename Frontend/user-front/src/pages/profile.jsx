import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";
import ProfileBox from "../component/profileBox.jsx";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return <p className="text-center mt-32">Loading...</p>;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-lightBg flex justify-center px-4 py-6 mt-8">
      <div className="bg-bg rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
        {/* ProfileBox with Edit Icon */}
        <div className="relative w-fit mx-auto -mt-16">
          <ProfileBox size="lg" />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-center text-primary mt-4">
          {user.full_name || user.username}
        </h2>

        {/* Info Boxes */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center p-3 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Full Name</span>
            <span className="text-secondary">{user.full_name || "Not set"}</span>
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
            <span className="text-secondary">{user.phone_number || "Not set"}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-text1 py-3 rounded-full font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
