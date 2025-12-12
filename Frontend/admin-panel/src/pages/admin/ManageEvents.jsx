import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Search from "../../components/SearchE";
import Filter from "../../components/FilterE";
import EventRow from "../../components/EventRow";
import EventDeleteModal from "../../components/EventDelete";
import EventEditModal from "./EditEvents";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  // ------------------ Fetch Events ------------------
  const fetchEvents = () => {
    setLoading(true);

    // Build query params
    let apiUrl = "http://localhost/EthioEvents/Backend/Controller/EventController.php?action=getAll";

    // Use searchAndFilter if there are filters or search
    if (search || filterType !== "all" || categoryFilter !== "all") {
      apiUrl = "http://localhost/EthioEvents/Backend/Controller/EventController.php?action=searchAndFilter";
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filterType !== "all") params.append('status', filterType);
      if (categoryFilter !== "all") params.append('category', categoryFilter);
      apiUrl += '&' + params.toString();
    }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        // Handle both direct array and {success, events} format
        if (data.success && data.events) {
          setEvents(data.events);
        } else if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, [search, filterType, categoryFilter]);

  // ------------------ Save Edited Event ------------------
  const saveUpdated = async (updatedEvent) => {
    try {
      const formData = new FormData();
      for (const key in updatedEvent) {
        if (updatedEvent[key] !== null && updatedEvent[key] !== undefined) {
          formData.append(key, updatedEvent[key]);
        }
      }

      const res = await fetch("http://localhost/EthioEvents/Backend/Controller/EventController.php?action=update", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Event updated successfully!");
        fetchEvents(); // Refresh the list
        setEditTarget(null);
      } else {
        alert("Failed to update event: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Error updating event");
    }
  };

  // ------------------ Delete Event ------------------
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const formData = new FormData();
      formData.append('id', deleteTarget.id);

      const res = await fetch("http://localhost/EthioEvents/Backend/Controller/EventController.php?action=delete", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Event deleted successfully!");
        fetchEvents(); // Refresh the list
        setDeleteTarget(null);
      } else {
        alert("Failed to delete event: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Error deleting event");
    }
  };

  // ------------------ Render ------------------
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-primary dark:text-text1 mb-6">
        Manage Events
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <Search search={search} setSearch={setSearch} />
        <div className="flex gap-3">
          <Filter value={filterType} onChange={setFilterType} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Culture">Culture</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center py-6">Loading events...</p>
      ) : (
        <div className="overflow-x-auto bg-bg dark:bg-bgDark shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Fee</th>
                <th className="px-4 py-3 text-left">Capacity</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="text-primary dark:text-text1Dark">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No events available
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <EventRow
                    key={event.id}
                    event={event}
                    onEdit={() => setEditTarget(event)}
                    onDelete={() => setDeleteTarget(event)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      <EventDeleteModal
        event={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      {/* Edit Modal */}
      <EventEditModal
        event={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={saveUpdated}
      />
    </AdminLayout>
  );
}
