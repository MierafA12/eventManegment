import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import MainLayout from '../layout/mainLayout';
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";
import { useLocation } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
   const location = useLocation();

  const redirectPath = location.state?.from || "/events";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
   const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    const role = await login(email, password);

    if (!role) {
      setMessage("Invalid email or password");
      setIsError(true);
      return;
    }

    if (role !== "participant") {
      setMessage("Use valid email & password.");
      setIsError(true);
      return;
    }

    // redirect to the original page if exists
    navigate(redirectPath);
  };
  return (
    <MainLayout>
      <div className="min-h-screen bg-lightBg flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-bg rounded-3xl shadow-2xl p-10 border border-secondary">

            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-primary mb-3">Ethio Events</h1>
              <p className="text-primary text-lg">Welcome back! Please login to continue.</p>
            </div>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg text-center font-medium ${
                  isError
                    ? "bg-inactiveBg text-inactiveText border border-inactiveText"
                    : "bg-activeBg text-activeText border border-activeText"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-primary font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 border border-primary rounded-xl"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-primary font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 border border-primary rounded-xl"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-5 h-5 text-primary rounded"
                  />
                  <span className="text-primary">Remember me</span>
                </label>

                <a href="#" className="text-primary hover:text-buttonHover font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* login button */}
              <button
                type="submit"
                className="w-full bg-primary text-text1 py-4 rounded-xl font-bold text-lg hover:bg-buttonHover"
              >
                Login
              </button>
            </form>

            {/* footer */}
            <div className="mt-8 text-center">
              <p className="text-primary">
                Don't have an account?{' '}
                <Link to="/register" className="text-secondary font-bold hover:text-buttonHover">
                  Register here
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
