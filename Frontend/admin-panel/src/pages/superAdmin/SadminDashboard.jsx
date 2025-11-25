import AdminLayout from "../../layouts/Adminlayout";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SuperAdminDashboard() {
  // MOCK DATA
  const stats = {
    totalAdmins: 12,
    activeAdmins: 9,
    inactiveAdmins: 3,
    totalEvents: 34,
  };

  const pieData = [
    { name: "Active Admins", value: stats.activeAdmins },
    { name: "Inactive Admins", value: stats.inactiveAdmins },
  ];

  const COLORS = ["#c2db6c", "#4b2e1f"];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6 text-primary">
        Super Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        
        <div className="p-6 rounded-2xl shadow bg-white border-l-4 border-secondary">
          <h2 className="text-lg font-medium text-primary">Total Admins</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalAdmins}</p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-white border-l-4 border-green-500">
          <h2 className="text-lg font-medium text-primary">Active Admins</h2>
          <p className="text-3xl font-bold mt-2">{stats.activeAdmins}</p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-white border-l-4 border-red-500">
          <h2 className="text-lg font-medium text-primary">Inactive Admins</h2>
          <p className="text-3xl font-bold mt-2">{stats.inactiveAdmins}</p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-white border-l-4 border-buttonHover">
          <h2 className="text-lg font-medium text-primary">Total Events</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalEvents}</p>
        </div>

      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow w-full h-[350px]">
        <h2 className="text-lg font-semibold mb-4 text-primary">
          Admin Status Overview
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              label
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
}
