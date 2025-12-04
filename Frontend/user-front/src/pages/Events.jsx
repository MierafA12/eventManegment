// src/pages/Events.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Events() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const events = [
    { id: 1, title: "Addis Tech Summit 2025", date: "March 15, 2025", location: "Millennium Hall", category: "tech", image: "/images/tech-conference.jpg" },
    { id: 2, title: "Ethio Music Festival", date: "April 20, 2025", location: "Meskel Square", category: "entertainment", image: "/images/music-festival.jpg" },
    { id: 3, title: "National Health Expo", date: "May 10, 2025", location: "Addis Ababa Exhibition Center", category: "Health", image: "/images/charity-run.jpg" },
    { id: 4, title: "Addis Art & Culture Fair", date: "June 5, 2025", location: "National Museum", category: "Art", image: "/images/art-exhibition.jpg" },
    { id: 5, title: "Ethiopian Sports Awards", date: "July 18, 2025", location: "Addis Ababa Stadium", category: "sports", image: "/images/sports.jpg" },
    { id: 6, title: "Startup Pitch Night", date: "August 22, 2025", location: "Iceaddis Hub", category: "tech", image: "/images/startup.jpg" },
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-purple-700">Ethio Events</Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-700 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-700 font-medium">About</Link>
            <Link to="/events" className="text-purple-700 font-bold">Events</Link>
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
              <Link to="/events" className="block text-purple-700 font-bold">Events</Link>
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

      {/* Events Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-8">Upcoming Events</h1>
          <p className="text-center text-xl text-gray-600 mb-12">Discover amazing events happening across Ethiopia</p>

          {/* Filter */}
          <div className="max-w-md mx-auto mb-16">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-purple-300 bg-white text-gray-700 font-medium focus:outline-none focus:border-purple-600 transition shadow-md"
            >
              <option value="all">All Categories</option>
              <option value="tech">Technology</option>
              <option value="entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="sports">Sports</option>
              <option value="Art">Art</option>
            </select>
          </div>

          {/* Event Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-3 duration-300">
                  <div className="h-56 bg-gray-200 relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {event.category.toUpperCase()}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center">
                        <i className="fas fa-calendar-alt mr-3 text-purple-600"></i>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-map-marker-alt mr-3 text-purple-600"></i>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <button className="mt-6 w-full bg-purple-700 text-white py-3 rounded-full font-semibold hover:bg-purple-800 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl text-gray-500">No events found in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
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