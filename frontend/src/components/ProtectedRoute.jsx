import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />; // replace => علشان ميرجعش للصفحة من الback
  }
  return children;
};
export default ProtectedRoute;
