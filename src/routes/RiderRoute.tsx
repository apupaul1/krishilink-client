import { Spin } from "antd";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

interface RiderRouteProps {
  children: React.ReactNode;
}

const FarmerRoute = ({ children }: RiderRouteProps) => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (role !== "rider") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default FarmerRoute;
