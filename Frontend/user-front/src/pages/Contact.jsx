// src/pages/Contact.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Thank you for your message! We will get back to you soon.');
    e.target.reset();
    setTimeout(() => setFormStatus(''), 5000); // Clear message after 5s
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
            <Link to="/contact" className="text-purple-700 font-bold">Contact</Link>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Link to="/" className="block text-gray-700 hover:text-purple-700 font-medium">Home</Link>
              <Link to="/about" className="block text-gray-700 hover:text-purple-700 font-medium">About</Link>
              <Link to="/events" className="block text-gray-700 hover:text-purple-700 font-medium">Events</Link>
              <Link to="/contact" className="block text-purple-700 font-bold">Contact</Link>
              <Link to="/login" className="block">
                <button className="w-full bg-purple-700 text-white py-2 rounded-full hover:bg-purple-800 transition">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Contact Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-16">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Send us a Message</h2>
              
              {formStatus && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center font-medium">
                  {formStatus}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="Event Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us about your event..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-700 text-white py-4 rounded-lg font-semibold text-lg hover:bg-purple-800 transition transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-purple-700 text-white rounded-2xl shadow-xl p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <i className="fas fa-map-marker-alt text-2xl mt-1"></i>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="opacity-90">Bole, Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <i className="fas fa-phone text-2xl mt-1"></i>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="opacity-90">+251 912 121212</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <i className="fas fa-envelope text-2xl mt-1"></i>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="opacity-90">info@Ethioevents.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <i className="fas fa-clock text-2xl mt-1"></i>
                  <div>
                    <p className="font-semibold">Working Hours</p>
                    <p className="opacity-90">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Same as before */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Ready To <span className="text-purple-500">talk?</span></h2>
            <p className="text-gray-300 mb-6">
              We are known for delivering exceptional experiences,<br />meticulous planning, and unparalleled attention to detail.
            </p>
            <Link to="/contact">
              <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition">
                Contact Us!
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><a href="#" className="hover:text-white">What We Do</a></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><a href="#" className="hover:text-white">Job</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Corporate Events</a></li>
                <li><a href="#" className="hover:text-white">Event Services</a></li>
                <li><a href="#" className="hover:text-white">Stand Construction</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400">
            <p><strong>Phone:</strong> (+251) 929 30 83 66</p>
            <p><strong>Email:</strong> info@Ethioevents.com</p>
          </div>
          <div className="flex space-x-6 mt-6 md:mt-0">
            {['facebook-f', 'instagram', 'twitter', 'linkedin-in', 'youtube'].map((icon) => (
              <a key={icon} href="#" className="text-2xl hover:text-purple-500 transition">
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}