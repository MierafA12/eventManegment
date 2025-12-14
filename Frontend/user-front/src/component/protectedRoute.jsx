// src/component/protectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../admin-panel/src/context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
