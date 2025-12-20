import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SadminDashboard from "./pages/superAdmin/SadminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateEvent from "./pages/admin/CreateEvents";
import CreateAdmin from "./pages/superAdmin/CreateAdmin";
import ManageAdmin from "./pages/superAdmin/ManageAdmin";
import ManageEvents from "./pages/admin/ManageEvents";
import SmanageEvents from "./pages/superAdmin/SmanageEvents";
import UserRegistration from "./pages/admin/UserRegistration";
import SettingsPage from "./components/setting";
import Notifications from "./components/Notification";
import { ThemeProvider } from "./context/ThemeContext";
import NotFound from "./pages/404";
import ProfilePage from "./profile.jsx";
import Contact from "./components/Contact.jsx";



export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
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
            path="/superadmin/SadminDashboard"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <SadminDashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/superadmin/CreateAdmin"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <CreateAdmin />
              </ProtectedRoute>
            }
          />
           <Route
            path="/superadmin/ManageAdmin"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <ManageAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/SmanageEvents"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <SmanageEvents />
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
            path="/superadmin/SettingsPage"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
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
          <Route
            path="/admin/Notifications"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/Notifications"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/profile"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/contact"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Contact />
              </ProtectedRoute>
            }
          />
           <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </NotificationProvider>
    </ThemeProvider>
  );
}
