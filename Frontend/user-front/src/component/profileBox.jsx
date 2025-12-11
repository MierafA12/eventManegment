import { useContext } from "react";
import { UserContext } from "../context/userContext.jsx";

export default function ProfileBox({ size = "md" }) {
  const { user } = useContext(UserContext);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
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
          {getInitials(user?.fullname || user?.username)}
        </div>
      )}
    </div>
  );
}
