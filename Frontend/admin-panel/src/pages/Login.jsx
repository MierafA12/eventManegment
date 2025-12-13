import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Message state
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState(""); // "error" | "success"

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Auto hide message after 4 seconds
  useEffect(() => {
    if (!alertMsg) return;
    const timer = setTimeout(() => setAlertMsg(""), 4000);
    return () => clearTimeout(timer);
  }, [alertMsg]);

  const showError = (msg) => {
    setAlertType("error");
    setAlertMsg(msg);
  };

  const showSuccess = (msg) => {
    setAlertType("success");
    setAlertMsg(msg);
  };

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email) return showError("Email is required");
  if (!emailRegex.test(email)) return showError("Invalid email format");
  if (!password) return showError("Password is required");

  try {
    const role = await login(email, password); // 👈 role string

    if (!role) {
      showError("Invalid email or password");
      return;
    }

    showSuccess("Login successful");

    setTimeout(() => {
      if (role === "admin") {
        navigate("/admin/AdminDashboard");
      } else if (role === "superadmin") {
        navigate("/superAdmin/SadminDashboard");
      } else {
        showError("Unauthorized access");
      }
    }, 800);

  } catch (err) {
    console.error(err);
    showError("Server error. Please try again later.");
  }
};

  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      {alertMsg && (
        <div
          className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 
          ${alertType === "success" ? "bg-green-500" : "bg-red-500"} 
          text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 animate-bounce`}
        >
          {alertType === "success" ? "✔️" : "❌"}
          <span className="font-bold text-lg">{alertMsg}</span>
          <button onClick={() => setAlertMsg("")} className="ml-4 font-bold text-white">✕</button>
        </div>
      )}

      <div className="bg-black/30 shadow-xl rounded-lg px-10 py-12 w-[380px] text-text1">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3a5 5 0 1 0 4.9 6h4.6v3h-3v3h-3v3h-3v-4.1A5 5 0 0 0 12 3z"/>
          </svg>
        </div>

        <h1 className="text-center text-2xl font-semibold tracking-wide mb-10">ADMIN PANEL</h1>

        <form onSubmit={handleLogin}>
          <label className="text-sm tracking-wider">EMAIL</label>
          <input
            type="text"
            className="w-full bg-transparent border-b-2 mb-8 border-secondary outline-none py-2 text-text1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm tracking-wider">PASSWORD</label>
          <div className="relative w-full mb-10">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent border-b-2 border-secondary outline-none py-2 pr-10 text-text1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
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
