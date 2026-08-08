import { Spin } from "antd";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
