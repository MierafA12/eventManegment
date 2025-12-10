import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/EthioEvents/Backend/public",
});

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
    status: admin.status
  });




export default API;
