import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../admin-panel/src/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { getProfile, changePassword } from "../src/api/adminApi.jsx";

export default function ProfilePage() {
  const { jwt } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(jwt);
        if (res.data.success) setProfile(res.data.profile);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [jwt]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    try {
      const res = await changePassword({ currentPassword, newPassword }, jwt);
      if (res.data.success) {
        alert("Password changed successfully!");
        setShowPasswordModal(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Failed to change password:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!profile) return <p className="text-center mt-10">Profile not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
      {/* Back button */}
      <button
        className="flex items-center gap-2 text-primary dark:text-white mb-6 hover:text-secondary transition"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft size={20} /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Profile avatar */}
        <div className="h-32 w-32 rounded-full border-4 border-secondary bg-gray-300 flex items-center justify-center text-4xl font-bold">
          {profile.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>

        {/* Profile info */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
          <p className="text-gray-500 dark:text-gray-300 text-lg mt-1">{profile.role}</p>
          <p className="text-gray-500 dark:text-gray-300 text-md mt-1">{profile.email}</p>

          {/* Change password button */}
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Additional info cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">Status</h3>
          <p className="text-gray-500 dark:text-gray-300 mt-1">{profile.status ?? "Active"}</p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">Username</h3>
          <p className="text-gray-500 dark:text-gray-300 mt-1">{profile.username}</p>
        </div>
      </div>

      {/* Change password modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full p-2 mb-2 rounded border"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 mb-2 rounded border"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full p-2 mb-4 rounded border"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleChangePassword}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
