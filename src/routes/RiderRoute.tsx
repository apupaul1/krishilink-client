import useRole from "../hooks/useRole";
import { Navigate } from "react-router";
import Loading from "../components/shared/Loading/Loading";

interface RiderRouteProps {
  children: React.ReactNode;
}

const RiderRoute = ({ children }: RiderRouteProps) => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (role !== "rider") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RiderRoute;
