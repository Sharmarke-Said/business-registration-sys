import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { isAuthenticated, status, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (status === "failed") {
      navigate("/login");
    } else if (
      isAuthenticated &&
      allowedRoles &&
      !allowedRoles.includes(user?.role)
    ) {
      // User is authenticated but not authorized for this route
      navigate("/unauthorized", { replace: true });
    }
  }, [status, isAuthenticated, user, allowedRoles, navigate]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If not authenticated, let the useEffect redirect to login
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated and authorized, render the children
  if (allowedRoles && allowedRoles.includes(user?.role)) {
    return children;
  }

  // Fallback: If authenticated but no specific role check is needed, render children
  if (!allowedRoles) {
    return children;
  }

  // Fallback: This should be handled by the useEffect redirect, but for safety
  return null;
};

export default ProtectedRoute;
