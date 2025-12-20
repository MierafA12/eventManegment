import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";
import ProfileBox from "../component/profileBox.jsx";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // If user not loaded yet, show loading
  if (!user) {
    return <p className="text-center mt-32">Loading...</p>;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goBack = () => {
    navigate(-1); // goes back to previous page
  };

  const goEdit = () => {
    navigate("/editProfile"); // replace with your actual edit route
  };

  return (
    <div className="min-h-screen bg-lightBg px-4 py-6">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="text-primary font-semibold mb-4 flex items-center gap-2"
      >
        ← Back
      </button>

      <div className="bg-bg rounded-3xl shadow-2xl w-full max-w-md mx-auto p-6 relative">
        {/* ProfileBox with Edit Icon */}
        <div className="relative w-fit mx-auto -mt-16">
          <ProfileBox size="lg" onClick={goEdit} />
          {/* Edit Pencil overlay */}
          <button
            onClick={goEdit}
            className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full shadow-lg hover:bg-secondary transition"
            title="Edit Profile"
          >
            ✎
          </button>
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
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
