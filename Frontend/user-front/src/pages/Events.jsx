import { useState, useEffect } from "react";
import MainLayout from "../layout/mainLayout.jsx";
import Notification from "../component/messages.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Calendar, MapPin, AlertCircle } from "lucide-react";
import { getEvents } from "../api/userApi.jsx";

export default function Events() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const IMAGE_BASE_URL = "http://localhost/EthioEvents/Backend/public/uploads/events/";

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getEvents();
      const data = res.data;

      if (data.success) {
        setEvents(data.events || []);
      } else {
        throw new Error(data.message || "No events found");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CATEGORY ================= */
  const categories = [
    "all",
    ...new Set(events.map((e) => e.category).filter(Boolean)),
  ];

  const filteredEvents =
    selectedCategory === "all"
      ? events.filter((e) => e.status === "active")
      : events.filter(
        (e) => e.category === selectedCategory && e.status === "active"
      );

  /* ================= HELPERS ================= */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const handleViewDetails = (id) => navigate(`/events/${id}`);

  const handleRegister = (id) => {
    if (!user) {
      setNotification({
        type: "error",
        message: "Please login to register!",
      });
      setTimeout(() => {
        setNotification(null);
        navigate("/login", { state: { from: `/events/${id}/register` } });
      }, 1500);
    } else {
      navigate(`/events/${id}/register`);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <MainLayout activePage="/events">
        <section className="pt-32 pb-20 text-center">
          <div className="animate-spin h-14 w-14 border-b-2 border-primary rounded-full mx-auto" />
          <p className="mt-6 text-secondary dark:text-text1">
            Loading events...
          </p>
        </section>
      </MainLayout>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <MainLayout activePage="/events">
        <section className="pt-32 pb-20 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-secondary dark:text-text1">{error}</p>
        </section>
      </MainLayout>
    );
  }

  /* ================= UI ================= */
  return (
    <MainLayout activePage="/events">
      <section className="pt-32 pb-20 bg-lightBg dark:bg-bgDark transition-colors">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-primary dark:text-text1 mb-6">
            Upcoming Events
          </h1>

          <p className="text-center text-secondary dark:text-text1 mb-12">
            Discover amazing events happening across Ethiopia
          </p>

          {/* CATEGORY DROPDOWN */}
          <div className="max-w-md mx-auto mb-16">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-6 py-4 rounded-full border bg-bg dark:bg-bgDark text-primary dark:text-text1 font-medium focus:border-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* EVENTS */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-bgDark rounded-2xl shadow">
              <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-secondary dark:text-text1">
                No events found
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-bgDark rounded-2xl shadow-xl overflow-hidden hover:-translate-y-2 transition"
                >
                  <div className="h-56 relative">
                    <img
                      src={event.image ? `${IMAGE_BASE_URL}${event.image}` : "/images/default-event.jpg"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full text-sm">
                      {event.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary dark:text-text1 mb-3">
                      {event.title}
                    </h3>

                    <div className="space-y-3 text-secondary dark:text-text1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-3" />
                        {formatDate(event.event_date)}{" "}
                        {event.event_time && `at ${event.event_time}`}
                      </div>

                      {event.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-3" />
                          {event.location}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button
                        onClick={() => handleViewDetails(event.id)}
                        className="bg-primary text-white py-3 rounded-full hover:bg-buttonHover"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleRegister(event.id)}
                        className="bg-green-600 text-white py-3 rounded-full hover:bg-green-700"
                      >
                        {event.fee > 0 ? "Book Now" : "Register"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          )}
        </div>
      </section>
    </MainLayout>
  );
}
