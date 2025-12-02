import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SadminDashboard from "./pages/superAdmin/SadminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateAdmin from "./pages/superAdmin/CreateAdmin";
import ManageAdmin from "./pages/superAdmin/ManageAdmin";



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />

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
            path="/admin/AdminDashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
            
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
