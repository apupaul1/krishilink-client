import { Spin } from "antd";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

interface FarmerRouteProps {
  children: React.ReactNode;
}

const FarmerRoute = ({ children }: FarmerRouteProps) => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (role !== "farmer") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default FarmerRoute;
