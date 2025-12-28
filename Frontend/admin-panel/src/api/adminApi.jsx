import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/EthioEvents/Backend/public",
});




export const getAdmins = (token) =>
  API.get("/admins", { headers: { Authorization: `Bearer ${token}` } });

export const createAdmin = (admin, token) =>
  API.post("/admin/create", {
    full_name: admin.fullName,
    username: admin.username,
    email: admin.email,
    password: admin.password,
  }, { headers: { Authorization: `Bearer ${token}` } });

export const toggleAdminStatus = (id, token) =>
  API.post("/admin/status", { id }, { headers: { Authorization: `Bearer ${token}` } });

export const deleteAdmin = (id, token) =>
  API.post("/admin/delete", { id }, { headers: { Authorization: `Bearer ${token}` } });

export const updateAdmin = (admin, token) =>
  API.post("/admin/update", {
    id: admin.id,
    full_name: admin.full_name,
    username: admin.username,
    email: admin.email,
    status: admin.status,
  }, { headers: { Authorization: `Bearer ${token}` } });

export const createEvent = (formData, token) =>
  API.post("/admin/events/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    },
  });

export const getAdminEvents = (token) =>
  API.get("/admin/events", { headers: { Authorization: `Bearer ${token}` } });

export const getFilteredAdminEvents = (params, token) =>
  API.get("/events/search-filter", {
    params,
    headers: { Authorization: `Bearer ${token}` }
  });

export const getEventsSummary = (token) =>
  API.get("/superadmin/events", { headers: { Authorization: `Bearer ${token}` } });

export const getProfile = (token) =>
  API.get("/admin/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProfile = (profileData, token) =>
  API.put("/profile", profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const changePassword = (data, token) =>
  API.post("/admin/change-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default API;
