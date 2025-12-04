import AdminLayout from "../../layouts/AdminLayout";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StatusCard from "../../components/statusCards";

export default function SuperAdminDashboard() {
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
      <h1 className="text-2xl font-semibold mb-6 text-primary dark:text-text1">
        Super Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatusCard
          title="Total Admins"
          value={stats.totalAdmins}
          borderColor="border-secondary"
        />

        <StatusCard
          title="Active Admins"
          value={stats.activeAdmins}
          borderColor="border-success"
        />

        <StatusCard
          title="Inactive Admins"
          value={stats.inactiveAdmins}
          borderColor="border-error"
        />

        <StatusCard
          title="Total Events"
          value={stats.totalEvents}
          borderColor="border-secondary"
        />
      </div>

      {/* Pie Chart */}
      <div className="bg-text1 dark:bg-bgDark p-6 rounded-2xl shadow w-full h-[350px]">
        <h2 className="text-lg font-semibold mb-4 text-primary dark:text-text1">
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
