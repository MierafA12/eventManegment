import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import API from "../api/adminApi.jsx"; 

export default function ProfileBox({ size = "md" }) {
  const { jwt, user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!jwt) return;
      try {
        const endpoint =
          user?.role === "superadmin" ? "/superadmin/profile" : "/admin/profile";
        const res = await API.get(endpoint, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        if (res.data.success) setProfile(res.data.profile);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [jwt, user?.role]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleClick = () => {
    if (!profile) return;
    if (profile.role === "superadmin") navigate("/superadmin/profile");
    else navigate("/admin/profile");
  };

  const displayName = profile?.name || user?.name || "User";
  const displayRole = profile?.role || user?.role || "admin";

  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={handleClick}
    >
      {profile?.profileImage ? (
        <img
          src={profile.profileImage}
          alt="profile"
          className={`rounded-full border-2 border-secondary object-cover 
            ${size === "lg" ? "h-20 w-20" : "h-10 w-10"}`}
        />
      ) : (
        <div
          className={`rounded-full border-2 border-secondary bg-primary 
            flex items-center justify-center font-bold text-white
            ${size === "lg" ? "h-20 w-20 text-2xl" : "h-10 w-10 text-sm"}`}
        >
          {getInitials(displayName)}
        </div>
      )}

      {size === "lg" && (
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {displayName}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm">{displayRole}</p>
        </div>
      )}
    </div>
  );
}
