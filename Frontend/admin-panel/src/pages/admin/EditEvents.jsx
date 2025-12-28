import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Button1 } from "../../components/Button";

export default function EditEventModal({ event, onClose, onSave }) {
  if (!event) return null;

  const [form, setForm] = useState({
    id: "",
    title: "",
    category: "",
    eventType: "", // Added
    location: "",
    eventLink: "", // Added
    date: "",
    time: "",
    fee: "",
    capacity: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  // Populate form when event changes
  useEffect(() => {
    if (event) {
      setForm({ ...event });
      setMessage({ text: "", type: "" });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Basic validation
    const requiredFields = ["title", "category", "eventType", "date", "time"];
    for (let field of requiredFields) {
      if (!form[field]) {
        setMessage({ text: `Please fill in ${field}`, type: "error" });
        return;
      }
    }

    if (form.eventType === "Physical" && !form.location) {
      setMessage({ text: "Please enter a location for physical events", type: "error" });
      return;
    }
    if (form.eventType === "Online" && !form.eventLink) {
      setMessage({ text: "Please enter a meeting link for online events", type: "error" });
      return;
    }

    onSave(form);
    setMessage({ text: "Event updated successfully!", type: "success" });

    // Close modal after 1.5 seconds
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div
      className="fixed inset-0 bg-primary0 flex items-center justify-center z-50 px-4"
      onClick={onClose} // clicking outside closes modal
    >
      <div
        className="bg-text1 w-full max-w-lg rounded-xl shadow-lg relative flex flex-col max-h-[90vh] dark:text-text1 dark:bg-bgDark"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-primary dark:text-text1">
            Edit Event
          </h2>
          <button
            onClick={onClose}
            className="text-primary dark:text-text1 hover:text-secondary"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* Status Message */}
          {message.text && (
            <div
              className={`p-3 rounded-lg text-sm mb-4 ${message.type === "success"
                  ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                  : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-white"
                }`}
            >
              {message.text}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="text-sm font-medium dark:text-text1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium dark:text-text1">Category</label>
            <input
              type="text"
              name="category"
              className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="text-sm font-medium dark:text-text1">Event Type</label>
            <select
              name="eventType"
              className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
              value={form.eventType}
              onChange={handleChange}
            >
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Location (Shown only if Physical) */}
          {form.eventType === "Physical" && (
            <div>
              <label className="text-sm font-medium dark:text-text1">Location</label>
              <input
                type="text"
                name="location"
                className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
                value={form.location || ""}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Online Link (Shown only if Online) */}
          {form.eventType === "Online" && (
            <div>
              <label className="text-sm font-medium dark:text-text1">Event Link</label>
              <input
                type="url"
                name="eventLink"
                className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
                value={form.eventLink || ""}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium dark:text-text1">Date</label>
              <input
                type="date"
                name="date"
                className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium dark:text-text1">Time</label>
              <input
                type="time"
                name="time"
                className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
                value={form.time}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Fee & Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium dark:text-text1">Fee (ETB)</label>
              <input
                type="number"
                name="fee"
                className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
                value={form.fee}
                onChange={handleChange}
              />
            </div>
            {form.eventType === "Physical" && (
              <div>
                <label className="text-sm font-medium dark:text-text1">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
                  value={form.capacity}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <Button1 onClick={handleSave}>Save Changes</Button1>
        </div>
      </div>
    </div>
  );
}
