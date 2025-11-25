import { useState } from "react";
import AdminLayout from "../../layouts/Adminlayout";

export default function CreateAdmin() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Created:", form); // later you replace with PHP API
  };

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-primary mb-6">
          Create New Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-primary font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter admin full name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-primary font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-primary font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-buttonHover transition"
          >
            Create Admin
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
