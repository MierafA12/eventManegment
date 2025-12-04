// src/pages/About.jsx
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const teamMembers = [
    { name: "Melat", title: "Event Director & Chief Organizer", email: "melat@Ethioevents.com" },
    { name: "Mieraf Abebe", title: "Event Operations Manager", email: "mieraf@Ethioevents.com" },
    { name: "Bethel Zewdu", title: "Event Marketing Specialist", email: "bethel@Ethioevents.com" },
    { name: "Lidiya Shenkut", title: "Technical Event Coordinator", email: "lidiya@Ethioevents.com" },
    { name: "Tsedeniya Yeshibelay", title: "Event Decor & Venue Manager", email: "Tsedeniya@Ethioevents.com" },
    { name: "Betelhem Mulugeta", title: "Guest Experience Lead", email: "Betelhem@Ethioevents.com" },
  ];

  return (
    <>
      {/* Navbar - Reusable Style */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-purple-700">Ethio Events</Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-700 font-medium">Home</Link>
            <Link to="/about" className="text-purple-700 font-bold">About</Link>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Link to="/" className="block text-gray-700 hover:text-purple-700 font-medium">Home</Link>
              <Link to="/about" className="block text-purple-700 font-bold">About</Link>
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

      {/* About Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">About Us</h1>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6 text-gray-700 text-lg">
              <p>Welcome to <strong>Ethio Events</strong>, where we transform ordinary moments into extraordinary experiences.</p>
              <p>Our team of dedicated professionals brings creativity, passion, and precision to every event we manage.</p>
              <p>With years of experience in the industry, we specialize in creating memorable corporate events, conferences, workshops, and networking opportunities that leave lasting impressions.</p>
              <p className="text-xl font-semibold text-purple-700">Our mission is simple: to exceed your expectations and create events that matter.</p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                <img src="/images/tech-conference.jpg" alt="Event Planning" className="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Event Planning</h3>
                    <p>Expert organization and coordination</p>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                <img src="/images/music-festival.jpg" alt="Catering" className="w-full h-48 object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold">Catering</h3>
                    <p>Delicious food & drinks</p>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                <img src="/images/charity-run.jpg" alt="Stage Setup" className="w-full h-48 object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold">Stage Setup</h3>
                    <p>Professional stage design</p>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                <img src="/images/art-exhibition.jpg" alt="Entertainment" className="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Entertainment</h3>
                    <p>Amazing performances & activities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
                <div className="h-64 bg-gray-200 border-2 border-dashed border-gray-300">
                  <img src="/images/profilee.jpg" alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-purple-600 font-medium mt-2">{member.title}</p>
                  <div className="flex items-center justify-center mt-4 text-gray-600">
                    <i className="fas fa-envelope mr-3"></i>
                    <span className="text-sm">{member.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Same as Home */}
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