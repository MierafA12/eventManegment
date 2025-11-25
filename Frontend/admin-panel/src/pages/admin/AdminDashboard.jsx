import AdminLayout from "../../layouts/Adminlayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>

      {/* MOCK DATA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 shadow rounded">Total Events</div>
        <div className="bg-white p-6 shadow rounded">Total Users</div>
        <div className="bg-white p-6 shadow rounded">Revenue</div>
        <div className="bg-white p-6 shadow rounded">New Registrations</div>
      </div>
    </AdminLayout>
  );
}
