// src/pages/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple mock validation (replace with real auth later)
    if (email === 'admin@ethioevents.com' && password === '123456') {
      setMessage('Login successful! Welcome back!');
      setIsError(false);
      // You can redirect or save token here
    } else {
      setMessage('Invalid email or password. Try: admin@ethioevents.com / 123456');
      setIsError(true);
    }

    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-purple-700">Ethio Events</Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-700 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-700 font-medium">About</Link>
            <Link to="/events" className="text-gray-700 hover:text-purple-700 font-medium">Events</Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-700 font-medium">Contact</Link>
            <Link to="/login">
              <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition">
                Login
              </button>
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Link to="/" className="block text-gray-700 hover:text-purple-700 font-medium">Home</Link>
              <Link to="/about" className="block text-gray-700 hover:text-purple-700 font-medium">About</Link>
              <Link to="/events" className="block text-gray-700 hover:text-purple-700 font-medium">Events</Link>
              <Link to="/contact" className="block text-gray-700 hover:text-purple-700 font-medium">Contact</Link>
              <Link to="/login" className="block">
                <button className="w-full bg-purple-700 text-white py-2 rounded-full hover:bg-purple-800 transition">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Login Form */}
      <div className="min-h-screen pt-24 bg-gradient-to-br from-purple-100 via-pink-50 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-purple-100">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-purple-700 mb-3">Ethio Events</h1>
              <p className="text-gray-600 text-lg">Welcome back! Please login to continue.</p>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
                isError 
                  ? 'bg-red-100 text-red-700 border border-red-300' 
                  : 'bg-green-100 text-green-700 border border-green-300'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-purple-500"></i>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="admin@ethioevents.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-purple-500"></i>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-14 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-600 hover:text-purple-800"
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
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-800 hover:to-pink-700 transition transform hover:scale-105 shadow-lg"
              >
                Login
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-purple-600 font-bold hover:text-purple-800">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}