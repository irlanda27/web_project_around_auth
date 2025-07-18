import { Navigate } from "react-router-dom";
function ProtectedRoute({ element: Component, loggedIn }) {
  return loggedIn ? Component : <Navigate to="/login" replace />;
}

export default ProtectedRoute;