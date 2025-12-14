import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";

export default function ProfileBox({ size = "md" }) {
  const { user } = useAuth(); // ✅ uses updated AuthContext

  const getInitials = () => {
    const name = user?.full_name || user?.username || user?.email;
    if (!name) return "U"; // fallback only if nothing exists

    const parts = name.split(" ").filter(Boolean); // remove empty strings
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const sizeClasses = {
    sm: "w-10 h-10 text-lg",
    md: "w-14 h-14 text-xl",
    lg: "w-20 h-20 text-3xl",
  };

  return (
    <div className="relative">
      {user?.profileImage ? (
        <img
          src={user.profileImage}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-primary`}
          alt="Profile"
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-primary text-text1 flex items-center justify-center font-bold border-2 border-primary`}
        >
          {getInitials()}
        </div>
      )}
    </div>
  );
}
