import { useState } from "react";
import AdminLayout from "../../layouts/Adminlayout";

import SearchAdmin from "../../components/search";
import FilterAdmin from "../../components/filter";
import AdminRow from "../../components/AdminRow";
import AdminDeleteModal from "../../components/AdminDelate";

const MOCK_ADMINS = [
  { id: 1, fullName: "Samuel Robel", username: "samuel", status: "active" },
  { id: 2, fullName: "Mieraf Abebe", username: "mieraf", status: "inactive" },
  { id: 3, fullName: "Kalkidan Daniel", username: "kal", status: "active" },
];

export default function ManageAdmin() {
  const [admins, setAdmins] = useState(MOCK_ADMINS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // filter + search
  const filtered = admins.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.username.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "all" ? true : a.status === status;

    return matchesSearch && matchesStatus;
  });

  // activate / deactivate admin
  const toggleStatus = (id) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "inactive" : "active" }
          : a
      )
    );
  };

  // delete admin
  const confirmDelete = (id) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Manage Admins
      </h1>

      {/* ⭐ Search + Filter Side By Side */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <SearchAdmin search={search} setSearch={setSearch} />
        <FilterAdmin value={status} onChange={setStatus} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-secondary text-primary">
            <tr>
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
                <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                    No data available
                </td>
                </tr>
            ) : (
                filtered.map((admin) => (
                <AdminRow
                    key={admin.id}
                    admin={admin}
                    onToggleStatus={toggleStatus}
                    onDelete={() => setDeleteTarget(admin)}
                />
                ))
            )}
            </tbody>

        </table>
      </div>

      {/* Delete Modal */}
      <AdminDeleteModal
        admin={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </AdminLayout>
  );
}
