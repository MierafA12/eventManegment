import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layout/mainLayout';
import { registerUser } from '../api/userApi';
import {
  Eye,
  EyeOff,
  Calendar,
  Phone,
  Mail,
  Lock,
  User,
  CheckCircle
} from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    dob: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!passwordMatch) return setPasswordMatch(false);

    try {
      const payload = {
        name: formData.name,
        username: formData.username,
        dob: formData.dob,
        phone_number: formData.phone,  // match backend
        email: formData.email,
        password: formData.password,
      };

      console.log("Payload sent to backend:", payload);

      const res = await registerUser(payload);

      if (res.data.success) {
        setShowSuccess(true);

        // Redirect to login after 2 seconds
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/login'); // adjust route if needed
        }, 2000);

        setFormData({
          name: '',
          username: '',
          dob: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false,
        });
      } else {
        setErrorMessage(res.data.message || 'Registration failed.');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMatch(
        name === 'password' ? value === formData.confirmPassword : formData.password === value
      );
    }
  };

  return (
    <MainLayout>
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-success text-text1 px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle size={28} />
          <span className="font-bold text-lg">Account created successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-inactiveBg text-inactiveText px-6 py-3 rounded-full shadow-xl">
          {errorMessage}
        </div>
      )}

      {/* Register Form */}
      <div className="min-h-screen bg-lightBg flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <div className="bg-bg rounded-3xl shadow-2xl p-10 border border-activeBg">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">Ethio Events</h1>
              <p className="text-xl text-secondary">Create your account to start managing events</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="relative">
                <label className="block text-secondary font-semibold mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-primary" size={22} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-4 py-4 border-2 border-activeBg rounded-xl focus:border-primary focus:ring-4 focus:ring-activeBg outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-secondary font-semibold mb-2">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-primary" size={22} />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-4 py-4 border-2 border-activeBg rounded-xl focus:border-primary focus:ring-4 focus:ring-activeBg outline-none transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-secondary font-semibold mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-primary" size={22} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-4 py-4 border-2 border-activeBg rounded-xl focus:border-primary focus:ring-4 focus:ring-activeBg outline-none transition"
                    placeholder="+251 912 345 678"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-secondary font-semibold mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-primary" size={22} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username || ''}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-4 py-4 border-2 border-activeBg rounded-xl focus:border-primary focus:ring-4 focus:ring-activeBg outline-none transition"
                    placeholder="Choose a unique username"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-secondary font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-primary" size={22} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-4 py-4 border-2 border-activeBg rounded-xl focus:border-primary focus:ring-4 focus:ring-activeBg outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-secondary font-semibold mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-primary" size={22} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-14 pr-14 py-4 border-2 border-activeBg rounded-xl focus:border-primary focus:ring-4 focus:ring-activeBg outline-none transition"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-primary hover:text-buttonHover"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-secondary font-semibold mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-primary" size={22} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full pl-14 pr-14 py-4 border-2 rounded-xl outline-none transition ${
                      !passwordMatch && formData.confirmPassword
                        ? 'border-inactiveText'
                        : 'border-activeBg focus:border-primary focus:ring-4 focus:ring-activeBg'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4 text-primary hover:text-buttonHover"
                  >
                    {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
                {!passwordMatch && formData.confirmPassword && (
                  <p className="text-inactiveText text-sm mt-2">Passwords do not match!</p>
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
                  className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary"
                />
                <label className="text-secondary">
                  I agree to the{' '}
                  <a className="text-primary font-bold hover:underline">Terms & Conditions</a>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!formData.terms || !passwordMatch}
                className="w-full bg-primary text-text1 py-5 rounded-xl font-bold text-xl hover:bg-buttonHover transition transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                <span>Create Account</span>
                <CheckCircle size={28} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
