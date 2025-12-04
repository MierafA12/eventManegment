// src/pages/Register.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Eye, EyeOff, Calendar, Phone, Mail, Lock, User, CheckCircle } from 'lucide-react';

export default function Register() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
    name: '', dob: '', phone: '', email: '', password: '', confirmPassword: '', terms: false
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Real-time password match check
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMatch(
        name === 'password' 
          ? value === formData.confirmPassword 
          : formData.password === value
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!passwordMatch) {
      setPasswordMatch(false);
      return;
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    console.log('Registration successful:', formData);
    // Here you would send data to backend
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

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle size={28} />
          <span className="font-bold text-lg">Account created successfully!</span>
        </div>
      )}

      {/* Register Form */}
      <div className="min-h-screen pt-24 bg-gradient-to-br from-purple-100 via-pink-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-purple-100">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-3">Ethio Events</h1>
              <p className="text-xl text-gray-600">Create your account to start managing events</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-purple-500" size={22} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-purple-500" size={22} />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-purple-500" size={22} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition"
                    placeholder="+251 912 345 678"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-purple-500" size={22} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-purple-500" size={22} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-14 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-purple-600 hover:text-purple-800"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-purple-500" size={22} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full pl-14 pr-14 py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 outline-none transition ${
                      !passwordMatch && formData.confirmPassword 
                        ? 'border-red-500' 
                        : 'border-gray-300 focus:border-purple-600'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4 text-purple-600 hover:text-purple-800"
                  >
                    {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
                {!passwordMatch && formData.confirmPassword && (
                  <p className="text-red-600 text-sm mt-2">Passwords do not match!</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <label className="text-gray-700">
                  I agree to the <a href="#" className="text-purple-600 font-bold hover:underline">Terms & Conditions</a>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!formData.terms || !passwordMatch}
                className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-5 rounded-xl font-bold text-xl hover:from-purple-800 hover:to-pink-700 transition transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                <span>Create Account</span>
                <CheckCircle size={28} />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-lg">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 font-bold hover:text-purple-800 text-xl">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}