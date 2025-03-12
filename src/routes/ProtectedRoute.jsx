import { Navigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthStore();
  console.log("user role in ProtectedRoute", user?.role);
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   return <Navigate to="/" />;
  // }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "ADMIN":
        return <Navigate to="/admin" replace />;
      case "PUBLISHER":
        return <Navigate to="/publisher" replace />;
      case "ADVERTISER":
        return <Navigate to="/advertiser" replace />;
      case "CUSTOMER":
        return <Navigate to="/" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
