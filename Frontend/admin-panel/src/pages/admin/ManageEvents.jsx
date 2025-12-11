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
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  // ------------------ Fetch Events ------------------
  useEffect(() => {
    fetch("http://localhost/EthioEvents/Backend/public/index.php?action=getAll")
      .then(res => res.json())
      .then(data => {
        if (data) setEvents(data); // adjust if backend returns {events: [...]}
      })
      .catch(err => console.error("Error fetching events:", err))
      .finally(() => setLoading(false));
  }, []);

  // ------------------ Filter + Search ------------------
  const filtered = events.filter((event) => {
    const today = new Date();
    const eventDate = new Date(event.date);

    // Filter by type
    let matchesFilter = true;
    if (filterType === "past") matchesFilter = eventDate < today;
    if (filterType === "upcoming") matchesFilter = eventDate >= today;

    // Search filter
    const searchLower = search.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(searchLower) ||
      event.location.toLowerCase().includes(searchLower) ||
      event.date.toLowerCase().includes(searchLower);

    return matchesFilter && matchesSearch;
  });

  // ------------------ Save Edited Event ------------------
  const saveUpdated = (updatedEvent) => {
    fetch("http://localhost/EthioEvents/Backend/public/index.php?action=update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEvents((prev) =>
            prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
          );
        } else {
          alert("Failed to update event");
        }
        setEditTarget(null);
      })
      .catch(err => console.error("Error updating event:", err));
  };

  // ------------------ Delete Event ------------------
  const confirmDelete = () => {
    if (!deleteTarget) return;

    fetch("http://localhost/EthioEvents/Backend/public/index.php?action=delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget.id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id));
        } else {
          alert("Failed to delete event");
        }
        setDeleteTarget(null);
      })
      .catch(err => console.error("Error deleting event:", err));
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
        <Filter value={filterType} onChange={setFilterType} />
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No events available
                  </td>
                </tr>
              ) : (
                filtered.map((event) => (
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
