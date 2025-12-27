import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/EthioEvents/Backend/public",
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= ADMIN ================= */

export const getAdmins = () => API.get("/admins");

export const createAdmin = (admin) =>
  API.post("/admin/create", {
    full_name: admin.fullName,
    username: admin.username,
    email: admin.email,
    password: admin.password,
  });

export const toggleAdminStatus = (id) =>
  API.post("/admin/status", { id });

export const deleteAdmin = (id) =>
  API.post("/admin/delete", { id });

export const updateAdmin = (admin) =>
  API.post("/admin/update", {
    id: admin.id,
    full_name: admin.full_name,
    username: admin.username,
    email: admin.email,
    status: admin.status,
  });



export const createEvent = (formData) =>
  API.post("/event/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAdminEvents = () =>
  API.get("/admin/events");



export const getEventsSummary = () =>
  API.get("/superadmin/events");



export const getProfile = () =>
  API.get("/admin/profile");

export const updateProfile = (profileData) =>
  API.put("/profile", profileData);

export const changePassword = (data) =>
  API.post("/admin/change-password", data);

export default API;
