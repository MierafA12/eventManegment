import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Users, Ticket, Globe } from "lucide-react";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";
import Header from "../component/Header.jsx";
import Notification from "../component/messages.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch event details from backend
  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost/EthioEvents/Backend/public/get_event.php?id=${id}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setEvent(data.data);
        } else {
          navigate("/events");
        }
      } else {
        // Fallback to sample data
        setEvent({
          id: parseInt(id),
          title: "Sample Event",
          description: "Event description here",
          event_date: "2025-12-25",
          event_time: "18:00:00",
          location: "Sample Location",
          eventType: "Physical",
          fee: 1000,
          capacity: 500,
          image: "/images/default-event.jpg"
        });
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      navigate("/events");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleRegister = () => {
    if (!user) {
      setNotification({ type: "error", message: "Please login to register!" });
      setTimeout(() => {
        setNotification(null);
        navigate("/login", { state: { from: `/events/${id}/register` } });
      }, 1500);
    } else {
      navigate(`/events/${id}/register`);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="pt-32 pb-20 bg-lightBg">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-secondary">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    navigate("/events");
    return null;
  }

  return (
    <div>
      <Header />

      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      <section className="pt-28 pb-20 bg-lightBg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Event Image */}
            <div className="relative h-96">
              <img
                src={event.image || "/images/default-event.jpg"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                  event.eventType === "Physical" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-purple-100 text-purple-800"
                }`}>
                  {event.eventType === "Physical" ? "📍 In-Person" : "🌐 Online"}
                </span>
              </div>
            </div>

            <div className="p-8">
              {/* Event Title & Info */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  {event.title}
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-lightBg rounded-xl">
                    <Calendar className="text-primary" size={20} />
                    <div>
                      <p className="text-sm text-secondary">Date & Time</p>
                      <p className="font-semibold">{formatDate(event.event_date)}</p>
                      {event.event_time && <p className="text-sm">{event.event_time}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-lightBg rounded-xl">
                    <MapPin className="text-primary" size={20} />
                    <div>
                      <p className="text-sm text-secondary">Venue</p>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-lightBg rounded-xl">
                    <Ticket className="text-primary" size={20} />
                    <div>
                      <p className="text-sm text-secondary">Price</p>
                      <p className="font-semibold text-xl">{event.fee} ETB</p>
                      <p className="text-sm">per ticket</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-lightBg rounded-xl">
                    <Users className="text-primary" size={20} />
                    <div>
                      <p className="text-sm text-secondary">Capacity</p>
                      <p className="font-semibold">{event.capacity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">About This Event</h2>
                <div className="prose max-w-none">
                  <p className="text-secondary leading-relaxed text-lg">{event.description}</p>
                </div>
              </div>

              {/* Online Event Link */}
              {event.eventType === "Online" && event.eventLink && (
                <div className="mb-8 p-6 bg-blue-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-1">Online Event Access</h3>
                      <p className="text-blue-700">
                        Join via:{" "}
                        <a 
                          href={event.eventLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="underline font-medium"
                        >
                          {event.eventLink}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Register Button */}
              <div className="border-t pt-8">
                <div className="max-w-md mx-auto">
                  <button
                    onClick={handleRegister}
                    className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-buttonHover transition"
                  >
                    Register Now
                    <ArrowRight size={24} />
                  </button>
                  
                  <p className="text-center text-gray-600 mt-4 text-sm">
                    {user 
                      ? `You are registering as ${user.full_name || user.username}`
                      : "Login required to register"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-2 text-primary hover:text-buttonHover transition mt-8"
          >
            <ArrowRight className="rotate-180" size={20} />
            Back to All Events
          </button>
        </div>
      </section>
    </div>
  );
}