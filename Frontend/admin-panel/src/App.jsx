import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SadminDashboard from "./pages/superAdmin/SadminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateEvent from "./pages/admin/CreateEvents";
import CreateAdmin from "./pages/superAdmin/CreateAdmin";
import ManageAdmin from "./pages/superAdmin/ManageAdmin";
import ManageEvents from "./pages/admin/ManageEvents";
import UserRegistration from "./pages/admin/UserRegistration";
import SettingsPage from "./components/setting";
import { ThemeProvider } from "./context/ThemeContext";
import NotFound from "./pages/404";



export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route
              path="/admin/CreateEvents"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/superAdmin/SadminDashboard"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <SadminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superAdmin/CreateAdmin"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <CreateAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superAdmin/ManageAdmin"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <ManageAdmin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/AdminDashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/ManageEvents"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ManageEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/UserRegistration"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superAdmin/SettingsPage"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/SettingsPage"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
