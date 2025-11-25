import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function AdminRow({ admin, onToggleStatus, onDelete }) {
  return (
    <tr className="border-b">
      <td className="px-4 py-3">{admin.fullName}</td>
      <td className="px-4 py-3">{admin.username}</td>
      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 text-sm rounded-lg ${
            admin.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {admin.status}
        </span>
      </td>

      <td className="px-4 py-3 flex gap-3">

        {/* Activate / Deactivate */}
        <button
          className="px-3 py-1 bg-secondary text-primary rounded-lg hover:bg-buttonHover hover:text-secondary transition"
          onClick={() => onToggleStatus(admin.id)}
        >
          {admin.status === "active" ? "Deactivate" : "Activate"}
        </button>

        {/* Delete */}
        <button
          className="p-2 text-error hover:bg-red-100 rounded-lg transition"
          onClick={() => onDelete(admin)}
        >
          <FiTrash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
