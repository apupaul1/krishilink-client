import {
  Avatar,
  Button,
  Input,
  message,
  Popconfirm,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "../../redux/features/user/userApi";
import { formatDate } from "../../utils/dateFormatter";
import { DeleteOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const UserManagement = () => {
  const roleColors: Record<string, string> = {
    admin: "red",
    farmer: "green",
    rider: "gold",
    user: "blue",
  };

  const { data, isLoading } = useGetUsersQuery();

  const [updateUserRole, { isLoading: roleLoading }] =
    useUpdateUserRoleMutation();

  const handleAdminToggle = async (email: string, currentRole: string) => {
    try {
      const newRole = currentRole === "admin" ? "user" : "admin";

      await updateUserRole({
        email,
        role: newRole,
      }).unwrap();

      message.success(
        newRole === "admin" ? "Admin access granted." : "Admin access removed.",
      );
    } catch (error) {
      message.error("Failed to update role.");
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "photoURL",
      render: (photo: string) => <Avatar src={photo} size={50} />,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: string) => (
        <Tag color={roleColors[role]}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (createdAt: string) => formatDate(createdAt),
    },
    {
      title: "Admin",
      render: (_: unknown, record: any) => (
        <Popconfirm
          title={
            record.role === "admin" ? "Remove Admin Access?" : "Make Admin?"
          }
          description={
            record.role === "admin"
              ? `Are you sure you want to remove admin access from ${record.name}?`
              : `Are you sure you want to make ${record.name} an admin?`
          }
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleAdminToggle(record.email, record.role)}
        >
          <Switch checked={record.role === "admin"} disabled={roleLoading} />
        </Popconfirm>
      ),
    },
    {
      title: "More Action",
      render: (_: unknown) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          //   onClick={() => handleDelete(record.email)}
        ></Button>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-7xl p-6">
      <div className="mb-8">
        <Title level={2}>User Management</Title>

        <Paragraph className="text-gray-500">
          Manage users and assign administrator privileges.
        </Paragraph>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <Input.Search
          placeholder="Search by name or email"
          allowClear
          className="max-w-sm"
        />

        <p className="text-gray-500">
          Total Users: <strong>{data?.data.length ?? 0}</strong>
        </p>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        loading={isLoading}
        dataSource={data?.data}
        pagination={{
          pageSize: 10,
        }}
      />
    </section>
  );
};

export default UserManagement;
