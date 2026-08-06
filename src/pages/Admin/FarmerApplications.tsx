import {
  Avatar,
  Button,
  Drawer,
  message,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import type { IFarmerApplication } from "../../redux/features/farmerApplication/farmerApplication.types";
import { useState } from "react";
import {
  useGetFarmerApplicationsQuery,
  useUpdateFarmerApplicationMutation,
} from "../../redux/features/farmerApplication/farmerApplicationApi";

const { Title, Paragraph } = Typography;

const FarmerApplications = () => {
  const { data, isLoading } = useGetFarmerApplicationsQuery({
    status: "pending",
  });

  const [updateApplication] = useUpdateFarmerApplicationMutation();

  const [selectedApplication, setSelectedApplication] =
    useState<IFarmerApplication | null>(null);

  const [open, setOpen] = useState(false);

  const handleView = (application: IFarmerApplication) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleApprove = async (id: string) => {
    try {
      await updateApplication({
        id,
        body: { status: "approved" },
      }).unwrap();

      message.success("Application approved successfully.");
      setOpen(false);
    } catch {
      message.error("Failed to approve application.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateApplication({
        id,
        body: { status: "rejected" },
      }).unwrap();

      message.success("Application rejected successfully.");
      setOpen(false);
    } catch {
      message.error("Failed to reject application.");
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "photoURL",
      render: (photo: string) => <Avatar src={photo} size={50} />,
    },
    {
      title: "Farmer",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "District",
      dataIndex: "district",
    },
    {
      title: "Farm Types",
      render: (_: unknown, record: IFarmerApplication) =>
        record.farmTypes.join(", "),
    },
    {
      title: "Status",
      render: (_: unknown, record: IFarmerApplication) => (
        <Tag
          color={
            record.status === "approved"
              ? "green"
              : record.status === "rejected"
                ? "red"
                : "gold"
          }
        >
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_: unknown, record: IFarmerApplication) => (
        <Space>
          <Button onClick={() => handleView(record)}>View</Button>

          <Popconfirm
            title="Approve this farmer?"
            onConfirm={() => handleApprove(record._id)}
          >
            <Button type="primary">Approve</Button>
          </Popconfirm>

          <Popconfirm
            title="Reject this farmer?"
            onConfirm={() => handleReject(record._id)}
          >
            <Button danger>Reject</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <Title level={2}>Farmer Applications</Title>

        <Paragraph>Review and manage all farmer applications.</Paragraph>
      </div>

      <Table
        rowKey="_id"
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        pagination={{
          pageSize: 10,
        }}
      />

      <Drawer
        title="Farmer Application"
        open={open}
        width={500}
        onClose={() => setOpen(false)}
      >
        {selectedApplication && (
          <>
            <div className="mb-6 flex items-center gap-4">
              <Avatar size={80} src={selectedApplication.photoURL} />

              <div>
                <h2 className="text-xl font-semibold">
                  {selectedApplication.name}
                </h2>

                <p className="text-gray-500">{selectedApplication.email}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p>
                <strong>Phone:</strong> {selectedApplication.phone}
              </p>

              <p>
                <strong>NID:</strong> {selectedApplication.nid}
              </p>

              <p>
                <strong>District:</strong> {selectedApplication.district}
              </p>

              <p>
                <strong>Area:</strong> {selectedApplication.area}
              </p>

              <p>
                <strong>Address:</strong> {selectedApplication.address}
              </p>

              <p>
                <strong>Farm Types:</strong>{" "}
                {selectedApplication.farmTypes.join(", ")}
              </p>

              <p>
                <strong>Experience:</strong> {selectedApplication.experience}{" "}
                Years
              </p>

              <p>
                <strong>About:</strong> {selectedApplication.about || "-"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <Tag
                  color={
                    selectedApplication.status === "approved"
                      ? "green"
                      : selectedApplication.status === "rejected"
                        ? "red"
                        : "gold"
                  }
                >
                  {selectedApplication.status.toUpperCase()}
                </Tag>
              </p>
            </div>

            {selectedApplication.status === "pending" && (
              <div className="mt-8 flex gap-3">
                <Button
                  type="primary"
                  onClick={() => handleApprove(selectedApplication._id)}
                >
                  Approve
                </Button>

                <Button
                  danger
                  onClick={() => handleReject(selectedApplication._id)}
                >
                  Reject
                </Button>
              </div>
            )}
          </>
        )}
      </Drawer>
    </section>
  );
};

export default FarmerApplications;
