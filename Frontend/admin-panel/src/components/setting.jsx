import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import DarkModeToggle from "../components/DarkMode";

export default function SettingsPage() {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = () => {
    alert("Profile picture updated successfully! (You can later connect to backend)");
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto p-6 rounded-xl shadow bg-white dark:bg-[#1f1f1f]">
        
        <h1 className="text-2xl font-semibold text-primary dark:text-secondary mb-6">
          Settings
        </h1>

        {/* ---------------- DARK MODE ---------------- */}
        <div className="flex items-center justify-between mb-6 p-4 rounded-lg border dark:border-gray-700">
          <div>
            <h2 className="text-lg font-medium text-primary dark:text-text1">
              Dark Mode
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Toggle light and dark theme.
            </p>
          </div>
          <DarkModeToggle />
        </div>

        {/* ---------------- PROFILE PICTURE UPLOAD ---------------- */}
        <div className="p-4 rounded-lg border dark:border-gray-700">
          <h2 className="text-lg font-medium text-primary dark:text-text1 mb-2">
            Profile Picture
          </h2>

          {/* Preview */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <img
              src={preview || "https://via.placeholder.com/120"}
              alt="Profile Preview"
              className="w-28 h-28 rounded-full object-cover border dark:border-gray-600"
            />

            <label className="cursor-pointer px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition">
              Choose Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <button
            onClick={handleSaveProfile}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary transition w-full"
          >
            Save Profile Picture
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
