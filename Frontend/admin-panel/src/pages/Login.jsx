import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button"; // import the reusable button

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const role = await login(username, password); // if username is email, OK

    if (role === "admin") navigate("/admin/AdminDashboard");
    else if (role === "superadmin") navigate("/superAdmin/SadminDashboard");
    else navigate("/user/dashboard");
  };

  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="bg-black/30 shadow-xl rounded-lg px-10 py-12 w-[380px] text-text1">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-secondary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3a5 5 0 1 0 4.9 6h4.6v3h-3v3h-3v3h-3v-4.1A5 5 0 0 0 12 3z" />
          </svg>
        </div>

        <h1 className="text-center text-2xl font-semibold tracking-wide mb-10">
          ADMIN PANEL
        </h1>

        <form onSubmit={handleLogin}>
          <label className="text-sm tracking-wider">USERNAME</label>
          <input
            type="text"
            className="w-full bg-transparent border-b-2 mb-8 border-secondary outline-none py-2 text-text1"
            onChange={(e) => setUsername(e.target.value)}
          />


          <label className="text-sm tracking-wider">PASSWORD</label>
          <div className="relative w-full mb-10">
            <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent border-b-2 border-secondary outline-none py-2 pr-10 text-text1"
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-secondary"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5 0-9-4-9-9 0-1.12.2-2.19.575-3.2M1 1l22 22" />
                </svg>
                ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                )}
            </button>
            </div>
          <div className="flex justify-end">
            <Button type="submit">LOGIN</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
