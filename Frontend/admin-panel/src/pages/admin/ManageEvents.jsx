import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Search from "../../components/SearchE"; // similar to SearchAdmin
import Filter from "../../components/filter"; // similar to FilterAdmin
import EventRow from "../../components/EventRow"; // similar to AdminRow
import EventDeleteModal from "../../components/EventDelete"; // similar to AdminDelete
import EventEditModal from "./EditEvents"; // modal for editing event
const MOCK_EVENTS = [
  {
    id: 1,
    title: "Music Festival",
    category: "Music",
    location: "Addis Ababa",
    date: "2025-12-20",
    time: "18:00",
    fee: "Free",
    capacity: 200,
  },
  {
    id: 2,
    title: "Tech Conference",
    category: "Technology",
    location: "Bahir Dar",
    date: "2025-12-25",
    time: "09:00",
    fee: "$50",
    capacity: 100,
  },
  {
    id: 3,
    title: "Art Exhibition",
    category: "Art",
    location: "Gondar",
    date: "2025-12-28",
    time: "10:00",
    fee: "Free",
    capacity: 50,
  },
];
export default function ManageEvents() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
 // Search + filter
const filtered = events.filter((event) => {
  const searchLower = search.toLowerCase();

  const matchesSearch =
    event.title.toLowerCase().includes(searchLower) ||
    event.date.toLowerCase().includes(searchLower);

  const matchesCategory = category === "all" ? true : event.category === category;

  return matchesSearch && matchesCategory;
});
  // Update event
  const saveUpdated = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
  };
  // Delete event
  const confirmDelete = () => {
    setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    setDeleteTarget(null);
  };
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-primary dark:text-text1 mb-6">
        Manage Events
      </h1>
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <Search search={search} setSearch={setSearch} />
        <Filter value={category} onChange={setCategory} options={["all", "Music", "Technology", "Art"]} />
      </div>
      {/* Table */}
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
