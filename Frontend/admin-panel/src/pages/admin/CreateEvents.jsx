import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Button1 } from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { createEvent } from "../../api/adminApi";
import API from "../../api/adminApi";

export default function CreateEvent() {
  const { jwt } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    eventType: "",
    location: "",
    eventLink: "",
    datetime: "",
    fee: "",
    capacity: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" }); // For styled messages

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" }); // Clear previous messages

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    try {
      const { data } = await createEvent(formData, jwt);

      if (data.success) {
        setMessage({ text: "Event created successfully!", type: "success" });
        setForm({
          title: "",
          description: "",
          category: "",
          eventType: "",
          location: "",
          eventLink: "",
          datetime: "",
          fee: "",
          capacity: "",
          image: null, // Reset image as well
        });
        setPreview(null); // Clear image preview
        // Optional: Redirect after delay
      } else {
        setMessage({ text: data.message || "Failed to create event", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Error creating event. Please try again.", type: "error" });
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-text1 dark:bg-bgDark shadow-lg rounded-xl p-8 transition-colors duration-300">
        <h1 className="text-2xl font-semibold text-primary dark:text-text1 mb-6">
          Create New Event
        </h1>

        {/* Inline Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.type === "success"
                ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-white"
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Event Title */}
          <div>
            <label className="block text-primary font-medium mb-1 dark:text-text1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter event title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-primary font-medium mb-1 dark:text-text1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            >
              <option value="">Select category</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Music">Music</option>
              <option value="Technology">Technology</option>
              <option value="Culture">Culture</option>
            </select>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-primary font-medium mb-1 dark:text-text1">
              Event Type
            </label>
            <select
              name="eventType"
              value={form.eventType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            >
              <option value="">Select event type</option>
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Location (Shown only if Physical) */}
          {form.eventType === "Physical" && (
            <div>
              <label className="block text-primary font-medium mb-1 dark:text-text1">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter event location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                required
              />
            </div>
          )}
          {/* Online Link (Shown only if Online) */}
          {form.eventType === "Online" && (
            <div>
              <label className="block text-primary font-medium mb-1 dark:text-text1">
                Online Event Link (Zoom / Google Meet / etc.)
              </label>
              <input
                type="url"
                name="eventLink"
                placeholder="Enter online meeting link"
                value={form.eventLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                required
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-primary font-medium mb-1 dark:text-text1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter event description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            ></textarea>
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-primary font-medium mb-1 dark:text-text1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              name="datetime"
              value={form.datetime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            />
          </div>

          {/* Registration Fee */}
          <div>
            <label className="block text-primary font-medium mb-1 dark:text-text1">
              Registration Fee (ETB)
            </label>
            <input
              type="number"
              name="fee"
              placeholder="0 for free"
              value={form.fee}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            />
          </div>

          {/* Capacity (shown only if Physical) */}
          {form.eventType === "Physical" && (
            <div>
              <label className="block text-primary font-medium mb-1 dark:text-text1">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                placeholder="Enter capacity"
                value={form.capacity}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                required={form.eventType === "Physical"}
              />
            </div>
          )}


          {/* Event Image */}
          <div>
            <label className="block text-primary font-medium mb-1 dark:text-text1">
              Event Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setForm({ ...form, image: file });
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-secondary focus:outline-none"
            />

            {/* Image Preview */}
            {preview && (
              <img
                src={preview}
                alt="Event Preview"
                className="mt-3 w-40 h-28 object-cover rounded-lg shadow"
              />
            )}
          </div>

          {/* Submit Button */}
          <Button1 type="submit">
            Create Event
          </Button1>
        </form>
      </div>
    </AdminLayout>
  );
}
