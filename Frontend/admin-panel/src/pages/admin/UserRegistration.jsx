import { useEffect, useState } from "react";
import { FaSpinner as Loader } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";
import { getRegistrations } from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";

export default function RegisteredUsers() {
  const { jwt } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await getRegistrations(jwt);
        if (response.data.success) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jwt) {
      fetchRegistrations();
    } else {
      setLoading(false);
    }
  }, [jwt]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex justify-center items-center h-64">
          <Loader className="animate-spin h-10 w-10 text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-6">
          Registered Users for Each Event
        </h1>

        {events.length === 0 ? (
          <p className="text-gray-500">No registrations found.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="mb-8 p-4 border rounded-lg shadow-sm bg-white dark:bg-bgDark"
            >
              <h2 className="text-lg font-semibold text-primary mb-2">
                {event.name}
              </h2>

              <p className="text-gray-600 text-sm mb-3">
                {event.registeredUsers.length} users registered
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border rounded-lg overflow-hidden">
                  <thead className="bg-lightBg dark:bg-primary text-text1">
                    <tr>
                      <th className="px-4 py-2 text-left">Full Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Ticket Code</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {event.registeredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-lightBg dark:hover:bg-gray-700">
                        <td className="px-4 py-2 dark:text-gray-300">{user.fullName}</td>
                        <td className="px-4 py-2 dark:text-gray-300">{user.email}</td>
                        <td className="px-4 py-2 font-mono text-xs dark:text-gray-300">{user.ticketCode}</td>
                        <td className="px-4 py-2 dark:text-gray-300 capitalize">{user.ticketType}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${user.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {user.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
