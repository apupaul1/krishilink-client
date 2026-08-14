import {
  AppstoreOutlined,
  DashboardOutlined,
  FileAddFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Layout, Menu, Typography } from "antd";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../redux/hooks";
import useRole from "../hooks/useRole";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  const { role } = useRole();

  const location = useLocation();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "/dashboard/my-orders",
      icon: <AppstoreOutlined />,
      label: <Link to="/dashboard/my-orders">My Orders</Link>,
    },
  ];

  if (role !== "admin" && role !== "farmer") {
    menuItems.push({
      key: "/dashboard/my-application",
      icon: <UserOutlined />,
      label: <Link to="/dashboard/rider-application">My Application</Link>,
    });
  }

  if (role !== "admin" && role !== "rider") {
    menuItems.push({
      key: "/dashboard/my-application",
      icon: <UserOutlined />,
      label: <Link to="/dashboard/my-application">My Application</Link>,
    });
  }

  if (role === "admin") {
    menuItems.push(
      {
        key: "/dashboard/user-management",
        icon: <TeamOutlined />,
        label: <Link to="/dashboard/user-management">User Management</Link>,
      },
      {
        key: "/dashboard/approve-farmer",
        icon: <TeamOutlined />,
        label: <Link to="/dashboard/approve-farmer">Farmer Applications</Link>,
      },
      {
        key: "/dashboard/approve-rider",
        icon: <TeamOutlined />,
        label: <Link to="/dashboard/approve-rider">Rider Applications</Link>,
      },
      {
        key: "/dashboard/all-orders",
        icon: <TeamOutlined />,
        label: <Link to="/dashboard/all-orders">All Orders</Link>,
      },
    );
  }

  if (role === "farmer") {
    menuItems.push(
      {
        key: "/dashboard/my-products",
        icon: <ProductOutlined />,
        label: <Link to="/dashboard/my-products">My Products</Link>,
      },
      {
        key: "/dashboard/add-product",
        icon: <FileAddFilled />,
        label: <Link to="/dashboard/add-product">Add Product</Link>,
      },
      {
        key: "/dashboard/pending-farmer-orders",
        icon: <FileAddFilled />,
        label: (
          <Link to="/dashboard/pending-farmer-orders">Pending Orders</Link>
        ),
      },
    );
  }

  if (role === "rider") {
    menuItems.push({
      key: "/dashboard/delivery-order",
      icon: <FileAddFilled />,
      label: <Link to="/dashboard/delivery-order">Delivery Order</Link>,
    });
  }

  menuItems.push({
    key: "/dashboard/settings",
    icon: <SettingOutlined />,
    label: <Link to="/dashboard/settings">Settings</Link>,
  });

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-100">
        <Link to="/" className="text-xl font-bold text-green-600">
          {collapsed ? "K" : "KrishiLink"}
        </Link>
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="mt-3 flex-1 border-e-0!"
      />

      {/* Bottom Profile */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <Avatar src={user?.photoURL || undefined} icon={<UserOutlined />} />

          {!collapsed && (
            <div className="min-w-0">
              <Text strong className="block truncate">
                {user?.displayName}
              </Text>

              <Text type="secondary" className="block truncate text-xs!">
                {user?.email}
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Layout className="min-h-screen! bg-gray-50!">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          collapsedWidth={80}
          className="fixed! left-0 top-0 z-40 h-screen bg-white!"
        >
          {sidebar}
        </Sider>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        width={250}
        closable={false}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        {sidebar}
      </Drawer>

      <Layout
        className={`min-h-screen! transition-all ${
          collapsed ? "lg:ml-20" : "lg:ml-62.5"
        }`}
      >
        {/* Header */}
        <Header className="sticky top-0 z-30 flex h-16! items-center justify-between border-b border-gray-100 bg-white! px-4! shadow-sm md:px-6!">
          <div className="flex items-center gap-3">
            {/* Desktop collapse */}
            <Button
              type="text"
              className="hidden! lg:inline-flex!"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />

            {/* Mobile menu */}
            <Button
              type="text"
              className="inline-flex! lg:hidden!"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setMobileOpen(true)}
            />

            <div>
              <h1 className="m-0! text-base font-semibold md:text-lg">
                Dashboard
              </h1>

              <p className="m-0! hidden text-xs text-gray-400 sm:block">
                Manage your KrishiLink account
              </p>
            </div>
          </div>
          <Avatar
            size={38}
            src={user?.photoURL || undefined}
            icon={<UserOutlined />}
          />
        </Header>

        {/* Content */}
        <Content className="p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
