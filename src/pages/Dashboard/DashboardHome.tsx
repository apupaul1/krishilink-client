import useRole from "../../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import FarmerDashboard from "./FarmerDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { role } = useRole();

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  }

  if (role === "rider") {
    return <RiderDashboard></RiderDashboard>;
  }

  if (role === "farmer") {
    return <FarmerDashboard></FarmerDashboard>;
  }

  return <UserDashboard></UserDashboard>;
};

export default DashboardHome;
