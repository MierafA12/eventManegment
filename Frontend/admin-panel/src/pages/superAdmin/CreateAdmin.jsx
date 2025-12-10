import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {Button1} from "../../components/Button";
import { createAdmin } from "../../api/adminApi";

export default function CreateAdmin() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await createAdmin(form);
    if (res.data.success) {
      alert("Admin created successfully!");
      setForm({ fullName: "", username: "", password: "" }); // Reset form
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error creating admin.");
  }
};

    return (
    <AdminLayout>
      <div className="max-w-xl mx-auto bg-text1 shadow-lg rounded-xl p-8 dark:bg-bgDark">
        <h1 className="text-2xl font-semibold text-primary mb-6 dark:text-text1">
          Create New Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

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
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>


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
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>


          <div>
            <label className="block text-primary font-medium mb-1 dark:text-text1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>

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
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>

          <Button1 type="submit">Create Admin</Button1>
        </form>
      </div>
    </AdminLayout>
  );
}