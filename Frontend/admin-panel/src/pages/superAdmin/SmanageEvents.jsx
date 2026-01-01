import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import AdminLayout from "../../layouts/AdminLayout";
import { getEventsSummary, getEvent } from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";
import EventDetailsModal from "../../components/EventDetailsModal";

export default function SmanageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { jwt } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEventsSummary(jwt);
        setEvents(Array.isArray(res.data.events) ? res.data.events : []);
      } catch (err) {
        console.error("Failed to load event summary:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    if (jwt) {
      fetchEvents();
    }
  }, [jwt]);

  const handleView = async (eventId) => {
    try {
      const res = await getEvent(eventId); // Public endpoint, no token needed usually, or uses cookie if same domain. AdminApi usually sends token if configured?
      // getEvent in adminApi uses API.get which sends token if interceptor configured OR manually.
      // My adminApi implementation of getEvent(id) does NOT send token in headers manually. 
      // But /event is public as per UserRoute.

      if (res.data.success) {
        setSelectedEvent(res.data.data);
      } else {
        alert("Failed to fetch event details");
      }
    } catch (err) {
      console.error("Error fetching event details:", err);
      alert("Error loading details");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-lightBg dark:bg-bgDark">
        <h1 className="text-3xl font-bold text-primary dark:text-secondary mb-8">Manage Events</h1>

        {loading ? (
          <p className="text-secondary text-lg">Loading events...</p>
        ) : (
          <div className="w-full max-w-5xl overflow-x-auto bg-white dark:bg-bgDark rounded-xl shadow-md">
            <table className="w-full text-left border-collapse">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Event Name</th>
                  <th className="px-6 py-3">Organizer</th>
                  <th className="px-6 py-3">Registered</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-secondary">
                      No events found
                    </td>
                  </tr>
                ) : (
                  events.map((event, idx) => (
                    <tr key={event.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="px-6 py-4 dark:text-gray-300">{idx + 1}</td>
                      <td className="px-6 py-4 font-semibold dark:text-gray-200">{event.event_name}</td>
                      <td className="px-6 py-4 dark:text-gray-300">{event.organizer}</td>
                      <td className="px-6 py-4 dark:text-gray-300">{event.total_attendance}</td>
                      <td className="px-6 py-4">
                        <button
                          className="flex items-center gap-2 text-primary dark:text-secondary font-medium hover:text-buttonHover"
                          onClick={() => handleView(event.id)}
                        >
                          View <FiArrowRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}

      </div>
    </AdminLayout>
  );
}
