import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Button1 } from "../../components/Button";
export default function EditEventModal({ event, onClose, onSave }) {
  if (!event) return null;

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    time: "",
    fee: "",
    capacity: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (event) {
      setForm({ ...event });
      setSaved(false);
    }
  }, [event]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(form);
    setSaved(true);

    setTimeout(() => onClose(), 1000);
  };

  return (
    <div className="fixed inset-0 bg-primary0 flex items-center justify-center z-50 px-4">
     <div className="bg-text1 w-full max-w-lg rounded-xl shadow-lg relative flex flex-col max-h-[90vh] dark:text-text1 dark:bg-bgDark">
  
  {/* Header */}
  <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
    <h2 className="text-xl font-semibold text-primary dark:text-text1">Edit Event</h2>
    <button onClick={onClose} className="text-primary dark:text-text1 hover:text-secondary">
      <FiX size={22} />
    </button>
  </div>

  {/* Scrollable form */}
  <div className="p-6 overflow-y-auto flex-1 space-y-4">
    {["title", "category", "location", "date", "time", "fee", "capacity"].map((field) => (
      <div key={field}>
        <label className="text-sm font-medium dark:text-text1 capitalize">{field}</label>
        <input
          type="text"
          name={field}
          className="w-full border px-3 py-2 rounded mt-1 dark:text-text1 dark:bg-bgDark"
          value={form[field]}
          onChange={handleChange}
        />
      </div>
    ))}
  </div>

  {/* Footer Buttons */}
  <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
    <button
      onClick={onClose}
      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
    >
      Cancel
    </button>

    <Button1 onClick={handleSave}>
      Save Changes
    </Button1>
  </div>
</div>
    </div>
  );
}
