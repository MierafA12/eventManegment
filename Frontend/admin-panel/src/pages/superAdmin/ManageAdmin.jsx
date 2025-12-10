import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import SearchAdmin from "../../components/search";
import FilterAdmin from "../../components/filter";
import AdminRow from "../../components/AdminRow";
import AdminDeleteModal from "../../components/AdminDelate";
import AdminEditModal from "../../pages/superAdmin/editAdmin";

import {
  getAdmins,
  toggleAdminStatus,
  deleteAdmin,
  updateAdmin,
} from "../../api/adminApi";

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  // Fetch admins
  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const res = await getAdmins();
        // Ensure we get an array
        setAdmins(Array.isArray(res.data.admins) ? res.data.admins : []);
      } catch (err) {
        console.error("Failed to load admins:", err);
        setAdmins([]);
      }
    };
    loadAdmins();
  }, []);

  // Toggle status
// Toggle status
const handleToggleStatus = async (admin) => {
  const newStatus = admin.status === "active" ? "inactive" : "active";
  try {
    await toggleAdminStatus({ ...admin, status: newStatus });
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === admin.id ? { ...a, status: newStatus } : a
      )
    );
  } catch (err) {
    console.error(err);
  }
};

// Save edit
const saveUpdated = async (updatedAdmin) => {
  try {
    await updateAdmin(updatedAdmin);
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === updatedAdmin.id
          ? { ...a, full_name: updatedAdmin.full_name, username: updatedAdmin.username, status: updatedAdmin.status }
          : a
      )
    );
    setEditTarget(null);
  } catch (err) {
    console.error(err);
  }
};


  // Delete
  const confirmDelete = async () => {
    try {
      await deleteAdmin(deleteTarget.id);
      setAdmins((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = admins.filter((a) => {
    const matchSearch =
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.username.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "all" ? true : a.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 max-w-5xl">
        <h2 className="text-3xl font-bold mb-6">Manage Admins</h2>

        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
          <SearchAdmin search={search} setSearch={setSearch} />
          <FilterAdmin value={status} onChange={setStatus} />
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>

                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((admin, index) => (
                  <AdminRow
                    key={admin.id}
                    index={index + 1}
                    admin={admin}
                    onToggleStatus={() => handleToggleStatus(admin)}
                    onEdit={() => setEditTarget(admin)}
                    onDelete={() => setDeleteTarget(admin)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <AdminDeleteModal
          admin={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />

        <AdminEditModal
          admin={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={saveUpdated}
        />
      </div>
    </AdminLayout>
  );
}
