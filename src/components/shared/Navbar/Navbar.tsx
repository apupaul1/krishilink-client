import { Avatar, Badge, Button, Dropdown, message } from "antd";
import { LayoutDashboard, LogOut, ShoppingCart, User } from "lucide-react";

import NavLinks from "./NavLinks";
import MobileDrawer from "./MobileDrawer";
import Logo from "../Logo/Logo";
import { Link } from "react-router";
import { useAppSelector } from "../../../redux/hooks";
import { logoutUser } from "../../../redux/features/auth/auth.service";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const items = [
    {
      key: "1",
      icon: <User size={16} />,
      label: "Profile",
    },
    {
      key: "2",
      icon: <LayoutDashboard size={16} />,
      label: "Dashboard",
    },
    {
      type: "divider" as const,
    },
    {
      key: "3",
      icon: <LogOut size={16} />,
      label: "Logout",
    },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();

      message.success("Logged out successfully.");
    } catch (error) {
      console.error(error);
      message.error("Failed to logout.");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-linear-to-br from-stone-50 via-green-50 to-emerald-100 shadow-sm">
      <div className="mx-auto flex py-4 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          <NavLinks />
        </nav>

        {/* Right */}
        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <>
              <Badge count={2}>
                <ShoppingCart className="cursor-pointer" />
              </Badge>

              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <Avatar className="cursor-pointer bg-green-600">U</Avatar>
              </Dropdown>

              <Button
                onClick={() => handleLogout()}
                type="primary"
                size="large"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button type="default" size="large">
                <Link to={"/auth/login"}>Login</Link>
              </Button>

              <Button type="primary" size="large">
                <Link to={"/auth/register"}>Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile */}
        <MobileDrawer />
      </div>
    </header>
  );
};

export default Navbar;
