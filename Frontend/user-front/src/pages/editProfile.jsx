import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";
import { getProfile, updateProfile } from "../api/userApi.jsx";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, jwt, setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!jwt) return;
      try {
        const { data } = await getProfile(jwt);
        if (data.success) {
          setFormData({
            fullname: data.profile.full_name || "",
            username: data.profile.username || "",
            email: data.profile.email || "",
            dob: data.profile.dob || "",
            phone: data.profile.phone_number || "",
          });
        } else {
          setMessage("Failed to fetch profile");
          setIsError(true);
        }
      } catch (err) {
  console.error("UPDATE PROFILE ERROR:", err.response || err);

  setMessage(
    err.response?.data?.message || "Server error while updating profile"
  );
  setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [jwt]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await updateProfile(jwt, {
      fullname: formData.fullname,
      username: formData.username,
      email: formData.email,
      dob: formData.dob,
      phone: formData.phone,
    });

    if (data.success) {
      setMessage(data.message);
      setIsError(false);

      setUser(data.profile);

      setTimeout(() => navigate("/profile"), 1200);
    } else {
      setMessage(data.message || "Failed to update profile");
      setIsError(true);
    }
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err.response || err);
    setMessage("Server error while updating profile");
    setIsError(true);
  }
};


  if (loading) return <p className="text-center mt-32">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-lightBg flex justify-center px-4 py-10">
      <div className="bg-bg rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-primary font-semibold hover:text-buttonHover"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Edit Profile</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-medium ${
              isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-primary font-semibold mb-1">Full Name</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:border-buttonHover" />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:border-buttonHover" />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:border-buttonHover" />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:border-buttonHover" />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-1">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:border-buttonHover" />
          </div>

          <button type="submit" className="w-full bg-primary text-text1 py-3 rounded-full font-semibold hover:bg-buttonHover transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
