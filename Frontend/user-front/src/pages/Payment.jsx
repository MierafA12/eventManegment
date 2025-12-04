// src/pages/Payment.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Upload, CheckCircle } from 'lucide-react';

export default function Payment() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState('telebirr');
  const [fileName, setFileName] = useState('No file chosen');
  const [showSuccess, setShowSuccess] = useState(false);

  const bankAccounts = {
    telebirr: "Telebirr Account: 251911223344",
    cbe: "CBE Account: 1000534089988",
    awash: "Awash Bank Account: 2000365654"
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('No file chosen');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      {/* Navbar - Authenticated Version */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-purple-700">Ethio Events</Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-700 font-medium">Home</Link>
            <Link to="/profile" className="text-gray-700 hover:text-purple-700 font-medium">Profile</Link>
            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
              Logout
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Link to="/" className="block text-gray-700 hover:text-purple-700 font-medium">Home</Link>
              <Link to="/profile" className="block text-gray-700 hover:text-purple-700 font-medium">Profile</Link>
              <button className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition">
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle size={28} />
          <span className="font-bold text-lg">Payment submitted successfully!</span>
        </div>
      )}

      {/* Main Payment Section */}
      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-purple-50 via-pink-50 to-white px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">Complete Your Payment</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 border border-purple-100">
            {/* Full Name */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-3 text-lg">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition"
              />
            </div>

            {/* Bank Selection */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-4 text-lg">Select Bank for Transfer</label>
              <div className="space-y-4">
                {[
                  { value: 'telebirr', label: 'Telebirr' },
                  { value: 'cbe', label: 'Commercial Bank of Ethiopia' },
                  { value: 'awash', label: 'Awash Bank' }
                ].map((bank) => (
                  <label
                    key={bank.value}
                    className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedBank === bank.value
                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bank"
                      value={bank.value}
                      checked={selectedBank === bank.value}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-6 h-6 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-4 text-lg font-medium text-gray-800">{bank.label}</span>
                  </label>
                ))}
              </div>

              {/* Dynamic Account Number */}
              <div className="mt-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl text-center transform transition-all duration-500">
                <p className="text-xl font-bold text-purple-800">
                  {bankAccounts[selectedBank]}
                </p>
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-10">
              <label className="block text-gray-700 font-semibold mb-4 text-lg">Upload Payment Receipt</label>
              <div className="border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center hover:border-purple-600 transition">
                <input
                  type="file"
                  id="receipt"
                  accept="image/*,.pdf"
                  required
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="receipt" className="cursor-pointer">
                  <Upload size={48} className="mx-auto text-purple-600 mb-4" />
                  <span className="block text-xl font-semibold text-gray-700 mb-2">Click to upload receipt</span>
                  <span className="text-sm text-gray-500">PDF, PNG, JPG up to 10MB</span>
                </label>
              </div>
              <p className="mt-4 text-center text-gray-600 font-medium">{fileName}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-5 rounded-2xl font-bold text-xl hover:from-purple-800 hover:to-pink-700 transition transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
            >
              <span>Complete Payment</span>
              <CheckCircle size={28} />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}