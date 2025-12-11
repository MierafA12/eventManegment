import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../component/Header2.jsx"; // private header
import { UserContext } from "../context/userContext.jsx";
import { ArrowRight } from "lucide-react";

export default function EventDetail() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample events (replace with API if needed)
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
    // add other events...
  ];

  const event = events.find((e) => e.id === parseInt(id));
  if (!event) {
    navigate("/events");
    return null;
  }

  const handleRegister = () => {
    if (!user) {
      navigate("/login", { state: { from: `/events/${id}` } });
    } else {
      // Navigate to registration/payment page
      navigate(`/events/${id}/register`);
    }
  };

  return (
    <div>
      <Header2 />
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

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="flex items-center justify-center gap-2 w-full bg-primary text-text1 py-4 rounded-full font-semibold hover:bg-buttonHover transition"
          >
            Register Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
