import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../redux/hooks";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {

  const { user, loading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={location?.pathname}
      />
    );
  }

  return children;
};

export default PrivateRoute;