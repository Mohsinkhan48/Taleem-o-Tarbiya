import { Navigate } from 'react-router';

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const user = JSON.parse(localStorage.getItem("user")!)

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role.name)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
