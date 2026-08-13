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
import { useState } from "react";
import { useGetRidersQuery, useUpdateRiderMutation } from "../../redux/features/rider/riderApi";
import type { IRider } from "../../redux/features/rider/rider.types";

const { Title, Paragraph } = Typography;

const ApproveRider = () => {
  const { data, isLoading } = useGetRidersQuery({
    // status: "pending",
  });

  const [updateRider] = useUpdateRiderMutation();

  const [selectedApplication, setSelectedApplication] =
    useState<IRider | null>(null);

  const [open, setOpen] = useState(false);

  const handleView = (application: IRider) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleApprove = async (id: string) => {
    try {
      await updateRider({
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
      await updateRider({
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
      title: "Rider",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "District",
      dataIndex: "district",
    },
    // {
    //   title: "Farm Types",
    //   render: (_: unknown, record: IFarmerApplication) =>
    //     record.farmTypes.join(", "),
    // },
    {
      title: "Status",
      render: (_: unknown, record: IRider) => (
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
      render: (_: unknown, record: IRider) => (
        <Space>
          <Button onClick={() => handleView(record)}>View</Button>

          <Popconfirm
            title="Approve this rider?"
            onConfirm={() => handleApprove(record._id)}
          >
            <Button type="primary">Approve</Button>
          </Popconfirm>

          <Popconfirm
            title="Reject this rider?"
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
        <Title level={2}>Pending Rider Application</Title>

        <Paragraph>Review and manage all rider applications.</Paragraph>
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
        title="Rider Application"
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
              {/* <p>
                <strong>Phone:</strong> {selectedApplication.phone}
              </p> */}

              <p>
                <strong>NID:</strong> {selectedApplication.nid}
              </p>

              <p>
                <strong>District:</strong> {selectedApplication.district}
              </p>

              {/* <p>
                <strong>Area:</strong> {selectedApplication.area}
              </p> */}

              <p>
                <strong>Address:</strong> {selectedApplication.address}
              </p>

              {/* <p>
                <strong>Farm Types:</strong>{" "}
                {selectedApplication.farmTypes.join(", ")}
              </p> */}

              {/* <p>
                <strong>Experience:</strong> {selectedApplication.experience}{" "}
                Years
              </p>

              <p>
                <strong>About:</strong> {selectedApplication.about || "-"}
              </p> */}

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

export default ApproveRider;
