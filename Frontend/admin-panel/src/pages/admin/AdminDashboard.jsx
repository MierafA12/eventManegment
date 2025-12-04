import AdminLayout from "../../layouts/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import StatusCard from "../../components/statusCards";

export default function AdminDashboard() {
  // Example statistics
  const stats = {
    upcomingEvents: 8,
    pastEvents: 26,
    totalEvents: 34,
  };

  // Example line chart data (replace with API later)
  const eventData = [
    { month: "Jan", events: 2 },
    { month: "Feb", events: 5 },
    { month: "Mar", events: 3 },
    { month: "Apr", events: 6 },
    { month: "May", events: 4 },
    { month: "Jun", events: 7 },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6 text-primary dark:text-text1">
        Admin Dashboard
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        <StatusCard
          title="Total Events"
          value={stats.totalEvents}
          borderColor="border-secondary"
        />

        <StatusCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          borderColor="border-success"
        />

        <StatusCard
          title="Past Events"
          value={stats.pastEvents}
          borderColor="border-error"
        />
      </div>

      {/* Line Chart */}
      <div className="bg-text1 dark:bg-bgDark p-6 rounded-2xl shadow w-full h-[380px]">
        <h2 className="text-lg font-semibold mb-4 text-primary dark:text-text1">
          Events Trend Overview
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={eventData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="events"
              stroke="#4b2e1f"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
}

