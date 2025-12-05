import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import {Button1} from "../../components/Button";

export default function AdminEditModal({ admin, onClose, onSave }) {
  if (!admin) return null;

  const [fullName, setFullName] = useState(admin.fullName);
  const [username, setUsername] = useState(admin.username);
  const [status, setStatus] = useState(admin.status);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFullName(admin.fullName);
    setUsername(admin.username);
    setStatus(admin.status);
    setSaved(false);
  }, [admin]);

  const handleSave = () => {
    onSave({ ...admin, fullName, username, status });
    setSaved(true);

    setTimeout(() => onClose(), 1000);
  };

  return (
    <div className="fixed inset-0 bg-primary0 flex items-center justify-center z-50 px-4 ">
      <div className="bg-text1 w-full max-w-md rounded-xl shadow-lg p-6 relative dark:text-text1 dark:bg-bgDark">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-primary hover:text-secondary dark:text-text1 dark:hover:text-text1"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-xl font-semibold text-primary mb-4 dark:text-text1">Edit Admin</h2>

        {/* Success Message */}
        {saved && <p className="text-success mb-3">✓ Changes saved successfully!</p>}

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium dark:text-text1">Full Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mt-1"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium dark:text-text1">Username</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium dark:text-text1">Status</label>
            <select
              className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

    
          <Button1
            onClick={handleSave}
            
          >
            Save Changes
          </Button1>
        </div>
      </div>
  );
}
