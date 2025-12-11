import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();

  if (!isLoggedIn) {
    // redirect to login and remember where we came from
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
