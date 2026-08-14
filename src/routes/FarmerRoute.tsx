import useRole from "../hooks/useRole";
import { Navigate } from "react-router";
import Loading from "../components/shared/Loading/Loading";

interface FarmerRouteProps {
  children: React.ReactNode;
}

const FarmerRoute = ({ children }: FarmerRouteProps) => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (role !== "farmer") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default FarmerRoute;
