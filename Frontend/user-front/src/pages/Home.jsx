import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-purple-700">Ethio Events</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-purple-700 font-medium">Home</a>
            <a href="/about" className="text-gray-700 hover:text-purple-700 font-medium">About</a>
            <a href="/events" className="text-gray-700 hover:text-purple-700 font-medium">Events</a>
            <a href="/contact" className="text-gray-700 hover:text-purple-700 font-medium">Contact</a>
            <a href="/login">
              <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition">
                Login
              </button>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-50"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
            <div className="container py-4 space-y-4">
              <a href="/" className="block text-gray-700 hover:text-purple-700 font-medium">Home</a>
              <a href="/about" className="block text-gray-700 hover:text-purple-700 font-medium">About</a>
              <a href="/events" className="block text-gray-700 hover:text-purple-700 font-medium">Events</a>
              <a href="/contact" className="block text-gray-700 hover:text-purple-700 font-medium">Contact</a>
              <a href="/login">
                <button className="w-full bg-purple-700 text-white py-2 rounded-full hover:bg-purple-800 transition">
                  Login
                </button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-purple-600 to-pink-600 text-white pt-24 pb-32">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Crafting Events That Matter</h1>
          <p className="text-xl md:text-2xl opacity-90">Experience the extraordinary with Ethio Events</p>
        </div>
      </header>

      {/* Our Services */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <div className="text-5xl text-purple-600 mb-4">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Event Planning</h3>
              <p className="text-gray-600 leading-relaxed">
                We specialize in comprehensive event planning services tailored to your vision and budget. From concept development to execution, we handle every detail...
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <div className="text-5xl text-purple-600 mb-4">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Venue Design & Decoration</h3>
              <p className="text-gray-600 leading-relaxed">
                Our creative design team transforms spaces into stunning environments that match your theme and vibe...
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <div className="text-5xl text-purple-600 mb-4">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">On-Site Coordination</h3>
              <p className="text-gray-600 leading-relaxed">
                Our professional coordinators are on-site to ensure everything runs according to plan...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Platform Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "fa-calendar-check", label: "Total Events", value: "125+" },
              { icon: "fa-users", label: "Total Users", value: "430+" },
              { icon: "fa-handshake", label: "Vendors Partnered", value: "67+" },
              { icon: "fa-star", label: "Average Rating", value: "4.8/5" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl text-purple-600 mb-4">
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <h3 className="text-xl font-semibold">{stat.label}</h3>
                <p className="text-3xl font-bold text-purple-700 mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 items-center opacity-70">
            <img src="/images/amanevent.png" alt="Partner" className="mx-auto" />
            <img src="/images/paarmaevent.png" alt="Partner" className="mx-auto" />
            <img src="/images/flowevent.jpg" alt="Partner" className="mx-auto" />
            <img src="/images/kanda.jpg" alt="Partner" className="mx-auto" />
            <img src="/images/ind.jpg" alt="Partner" className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Ready To <span className="text-purple-500">talk?</span></h2>
            <p className="text-gray-300 mb-6">
              We are known for delivering exceptional experiences,<br />meticulous planning, and unparalleled attention to detail.
            </p>
            <a href="/contact">
              <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition">
                Contact Us!
              </button>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">What We Do</a></li>
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
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

        <div className="container mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
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

export default App;