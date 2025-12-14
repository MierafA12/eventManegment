import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";
import Header from "../component/Header.jsx";
import Notification from "../component/messages.jsx";

export default function EventDetail() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
   const [notification, setNotification] = useState(null);

  const events = [
    {
      id: 1,
      title: "Addis Tech Summit 2025",
      date: "March 15, 2025",
      location: "Millennium Hall",
      category: "tech",
      description: "A tech conference featuring top speakers and startups.",
      capacity: 500,
      price: "100 USD",
      organizer: "Tech Ethiopia",
      type: "In-person",
      onlineLink: "",
      image: "/images/tech-conference.jpg",
    },
    {
      id: 2,
      title: "Ethio Music Festival",
      date: "April 20, 2025",
      location: "Meskel Square",
      category: "entertainment",
      description: "A grand music festival celebrating Ethiopian and international artists.",
      capacity: 1000,
      price: "50 USD",
      organizer: "Music Corp",
      type: "Online",
      onlineLink: "https://zoom.com/ethio-music",
      image: "/images/music-festival.jpg",
    },
  ];

  const event = events.find((e) => e.id === parseInt(id));
  if (!event) {
    navigate("/events");
    return null;
  }

  const handleRegister = () => {
    if (!user) {
       setNotification({ type: "error", message: "Please login to register!" });
    setTimeout(() => {
      setNotification(null);},
       1500);
      navigate("/login", { state: { from: `/events/${id}/register` } });
    } else {        
      navigate(`/events/${id}/register`);
    }
  };

  return (
    <div>
      <Header />
    <section className="pt-32 pb-20 bg-lightBg">
      <div className="container mx-auto px-4 max-w-4xl">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover rounded-3xl shadow-lg mb-8"
        />
        <h1 className="text-5xl font-bold text-primary mb-4">{event.title}</h1>

        <div className="flex flex-wrap gap-4 mb-6 text-secondary">
          <span className="flex items-center gap-2">
            <i className="fas fa-calendar-alt text-primary"></i> {event.date}
          </span>
          <span className="flex items-center gap-2">
            <i className="fas fa-map-marker-alt text-primary"></i> {event.location}
          </span>
          <span className="bg-primary text-text1 px-3 py-1 rounded-full font-semibold">
            {event.category.toUpperCase()}
          </span>
        </div>

        <p className="text-xl text-secondary leading-relaxed mb-6">{event.description}</p>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex justify-between p-4 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Capacity</span>
            <span className="text-secondary">{event.capacity}</span>
          </div>
          <div className="flex justify-between p-4 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Price</span>
            <span className="text-secondary">{event.price}</span>
          </div>
          <div className="flex justify-between p-4 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Organizer</span>
            <span className="text-secondary">{event.organizer}</span>
          </div>
          <div className="flex justify-between p-4 bg-lightBg rounded-xl shadow-sm">
            <span className="font-semibold text-primary">Type</span>
            <span className="text-secondary">{event.type}</span>
          </div>
          {event.type.toLowerCase() === "online" && (
            <div className="flex justify-between p-4 bg-lightBg rounded-xl shadow-sm col-span-2">
              <span className="font-semibold text-primary">Online Link</span>
              <a
                href={event.onlineLink}
                target="_blank"
                className="text-blue-500 underline"
              >
                Join Event
              </a>
            </div>
          )}
        </div>

        <button
          onClick={handleRegister}
          className="flex items-center justify-center gap-2 w-full bg-primary text-text1 py-4 rounded-full font-semibold hover:bg-buttonHover transition"
        >
          Register Now
          <ArrowRight size={20} />
        </button>
      </div>
  
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
        />
      )}
    </section>
    
    </div>
  );
}
