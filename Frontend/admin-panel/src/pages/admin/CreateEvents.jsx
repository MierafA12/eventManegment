import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Button1 } from "../../components/Button";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    datetime: "",
    fee: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", form); // will later connect to PHP backend
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-text1 shadow-lg rounded-xl p-8 dark:bg-bgDark">
        <h1 className="text-2xl font-semibold text-primary mb-6 dark:text-text1">
          Create New Event
        </h1>

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
          {/* Location */}
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

          {/* Capacity */}
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
              required
            />
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


