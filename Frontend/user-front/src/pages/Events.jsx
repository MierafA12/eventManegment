import { useState } from "react";
import MainLayout from "../layout/mainLayout.jsx";
import Notification from "../component/messages.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";

export default function Events() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const events = [
    { id: 1, title: "Addis Tech Summit 2025", date: "March 15, 2025", location: "Millennium Hall", category: "tech", image: "/images/tech-conference.jpg" },
    { id: 2, title: "Ethio Music Festival", date: "April 20, 2025", location: "Meskel Square", category: "entertainment", image: "/images/music-festival.jpg" },
    { id: 3, title: "National Health Expo", date: "May 10, 2025", location: "Addis Ababa Exhibition Center", category: "Health", image: "/images/charity-run.jpg" },
    { id: 4, title: "Addis Art & Culture Fair", date: "June 5, 2025", location: "National Museum", category: "Art", image: "/images/art-exhibition.jpg" },
    { id: 5, title: "Ethiopian Sports Awards", date: "July 18, 2025", location: "Addis Ababa Stadium", category: "sports", image: "/images/sports.jpg" },
    { id: 6, title: "Startup Pitch Night", date: "August 22, 2025", location: "Iceaddis Hub", category: "tech", image: "/images/startup.jpg" },
  ];

  const filteredEvents = selectedCategory === "all"
    ? events
    : events.filter((e) => e.category === selectedCategory);

  // View details WITHOUT login
  const handleViewDetails = (id) => {
    navigate(`/events/${id}`);
  };

  // Register REQUIRES login
 const handleRegister = (id) => {
  if (!user) {
    setNotification({ type: "error", message: "Please login to register!" });
    setTimeout(() => {
      setNotification(null);
      // pass the target page in state
      navigate("/login", { state: { from: `/events/${id}/register` } });
    }, 1500);
  } else {
    navigate(`/events/${id}/register`);
  }
};

  const EventsContent = (
    <section className="pt-32 pb-20 bg-lightBg">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-primary mb-8">
          Upcoming Events
        </h1>
        <p className="text-center text-xl text-secondary mb-12">
          Discover amazing events happening across Ethiopia
        </p>

        {/* Category Selector */}
        <div className="max-w-md mx-auto mb-16">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-6 py-4 rounded-full border-2 border-secondary bg-bg text-primary font-medium focus:outline-none focus:border-primary transition shadow-md"
          >
            <option value="all">All Categories</option>
            <option value="tech">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="sports">Sports</option>
            <option value="Art">Art</option>
          </select>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-bg rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-3 duration-300"
            >
              <div className="h-56 relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-text1 px-4 py-2 rounded-full text-sm font-bold">
                  {event.category.toUpperCase()}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {event.title}
                </h3>

                <div className="space-y-3 text-secondary">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt mr-3 text-primary"></i>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-3 text-primary"></i>
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={() => handleViewDetails(event.id)}
                    className="w-full bg-primary text-text1 py-3 rounded-full font-semibold hover:bg-buttonHover transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleRegister(event.id)}
                    className="w-full bg-green-600 text-text1 py-3 rounded-full font-semibold hover:bg-green-700 transition"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </section>
  );

  return <MainLayout activePage="/events">{EventsContent}</MainLayout>;
}
