import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {Button1} from "../../components/Button";

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
      <div className="max-w-xl mx-auto bg-text1 shadow-lg rounded-xl p-8 dark:bg-bgDark">
        <h1 className="text-2xl font-semibold text-primary mb-6 dark:text-text1">
          Create New Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-primary font-medium mb-1 dark:text-text1">
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
            <label className="block text-primary font-medium mb-1 dark:text-text1">
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
            <label className="block text-primary font-medium mb-1 dark:text-text1">
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

          <Button1
            type="submit"
          >
            Create Admin
          </Button1>
        </form>
      </div>
    </AdminLayout>
  );
}
