import { Navigate } from "react-router-dom";

const ProtectedPatientRoute = ({ children }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== "patient") {
    return <Navigate to="/doctor-dashboard" replace />;
  }

  return children;
};

export default ProtectedPatientRoute;