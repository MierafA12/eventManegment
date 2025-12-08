import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/EthioEvents/Backend/public",
});

// GET all admins
export const getAdmins = () => API.get("/admins");

// Toggle status
export const toggleAdminStatus = (id, status) =>
  API.post("/admin/toggle", { id, status });

// Delete admin
export const deleteAdmin = (id) =>
  API.delete("/admin/delete", { data: { id } });

// Edit admin
export const updateAdmin = (admin) =>
  API.put("/admin/edit", {
    id: admin.id,
    username: admin.username,
  });

export default API;
