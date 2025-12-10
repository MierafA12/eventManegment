import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-bgDark text-text1 py-16 mt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Ready To <span className="text-secondary">talk?</span>
          </h2>

          <p className="text-text1 mb-6">
            We deliver exceptional experiences with precision and creativity.
          </p>

          <Link to="/contact">
            <button className="bg-secondary hover:bg-buttonHover px-8 py-4 rounded-full text-lg font-semibold transition">
              Contact Us!
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-text1">Company</h3>
            <ul className="space-y-2 text-text1">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#">What We Do</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#">Job</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-text1">Services</h3>
            <ul className="space-y-2 text-text1">
              <li><a href="#">Corporate Events</a></li>
              <li><a href="#">Event Services</a></li>
              <li><a href="#">Stand Construction</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-secondary flex flex-col md:flex-row justify-between items-center">
        <div className="text-secondary">
          <p><strong className="text-text1">Phone:</strong> (+251) 929 30 83 66</p>
          <p><strong className="text-text1">Email:</strong> info@Ethioevents.com</p>
        </div>

        <div className="flex space-x-6 mt-6 md:mt-0 text-secondary">
          {["facebook", "instagram", "twitter", "linkedin", "youtube"].map((icon) => (
            <i
              key={icon}
              className={`fab fa-${icon} text-2xl hover:text-primary`}
            ></i>
          ))}
        </div>
      </div>
    </footer>
  );
}
