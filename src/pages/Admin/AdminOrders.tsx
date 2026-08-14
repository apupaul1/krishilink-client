import {
  Button,
  Empty,
  message,
  Modal,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";

import {
  useAssignRiderMutation,
  useGetAllOrdersQuery,
} from "../../redux/features/order/orderApi";
import { useGetRidersQuery } from "../../redux/features/rider/riderApi";
import { useState } from "react";
import Loading from "../../components/shared/Loading/Loading";

const { Title, Paragraph } = Typography;

interface IAdminOrder {
  _id: string;
  trackingId: string;

  customerEmail: string;

  farmerEmail: string;

  farmerLocation: {
    district: string;
    area: string;
    address: string;
  };

  items: {
    productId: string;
    name: string;
    image: string;
    quantity: number;
    unit: string;
    price: number;
  }[];

  shippingAddress: {
    name: string;
    phone: string;
    district: string;
    area: string;
    address: string;
    note?: string;
  };

  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;

  orderStatus: string;

  riderEmail: string | null;

  createdAt: string;
}

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<IAdminOrder | null>(null);

  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const { data, isLoading } = useGetAllOrdersQuery({
    // status: "ready_for_pickup",
  });

  const { data: riderData, isLoading: riderLoading } = useGetRidersQuery(
    {
      status: "approved",
      workStatus: "available",
      district: selectedOrder?.farmerLocation.district ?? "",
      area: selectedOrder?.farmerLocation.area ?? "",
    },
    {
      skip: !selectedOrder,
    },
  );

  const [assignRider, { isLoading: isAssigning }] = useAssignRiderMutation();

  const handleAssignRider = async (orderId: string, riderEmail: string) => {
    try {
      await assignRider({
        orderId,
        riderEmail,
      }).unwrap();

      message.success("Rider assigned successfully.");

      setAssignModalOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error(error);
      message.error("Failed to assign rider.");
    }
  };

  const columns: ColumnsType<IAdminOrder> = [
    {
      title: "Customer",
      key: "customer",
      width: 160,
      render: (_, record) => (
        <div>
          <p className="font-medium">{record.shippingAddress.name}</p>

          <p className="text-xs text-gray-500">
            {record.shippingAddress.phone}
          </p>
        </div>
      ),
    },

    {
      title: "Farmer",
      dataIndex: "farmerEmail",
      width: 180,
      render: (email: string) => <span className="text-sm">{email}</span>,
    },

    {
      title: "Products",
      dataIndex: "items",
      width: 220,
      render: (items: IAdminOrder["items"]) => (
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.productId}>
              <p className="text-sm font-medium">{item.name}</p>

              <p className="text-xs text-gray-500">
                {item.quantity} {item.unit}
              </p>
            </div>
          ))}
        </div>
      ),
    },

    {
      title: "Pickup Location",
      key: "farmerLocation",
      width: 200,
      render: (_, record) => (
        <div>
          <p className="text-sm font-medium">
            {record.farmerLocation.area}, {record.farmerLocation.district}
          </p>

          <p className="line-clamp-2 text-xs text-gray-500">
            {record.farmerLocation.address}
          </p>
        </div>
      ),
    },

    {
      title: "Order Value",
      dataIndex: "subtotal",
      width: 110,
      render: (subtotal: number) => (
        <span className="font-semibold">৳ {subtotal.toLocaleString()}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "orderStatus",
      width: 140,
      render: (status: string) => (
        <Tag color="green">{status.replaceAll("_", " ").toUpperCase()}</Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {record.orderStatus === "ready_for_pickup" && (
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setSelectedOrder(record);
                setAssignModalOpen(true);
              }}
            >
              Assign Rider
            </Button>
          )}

          {record.orderStatus === "waiting_for_rider_acceptance" && (
            <Button size="small" disabled>
              Waiting for Rider
            </Button>
          )}

          {record.orderStatus === "picked_up" && (
            <Button size="small" disabled>
              Picked Up
            </Button>
          )}

          {record.orderStatus === "out_for_delivery" && (
            <Button size="small" disabled>
              Out for Delivery
            </Button>
          )}

          {record.orderStatus === "delivered" && (
            <Button size="small" disabled>
              Delivered
            </Button>
          )}
        </>
      ),
    },
  ];

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section>
      <div className="mb-6">
        <Title level={2} className="mb-1!">
          Ready for Pickup
        </Title>

        <Paragraph className="text-gray-500!">
          Assign available riders to orders that are ready for pickup.
        </Paragraph>
      </div>

      {!data?.data?.length ? (
        <div className="rounded-xl border border-gray-200 bg-white py-20">
          <Empty description="No orders are ready for pickup." />
        </div>
      ) : (
        <>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={data.data}
            pagination={{
              pageSize: 10,
            }}
            scroll={{ x: 1100 }}
          />

          <Modal
            title="Assign Rider"
            open={assignModalOpen}
            onCancel={() => {
              setAssignModalOpen(false);
              setSelectedOrder(null);
            }}
            footer={null}
          >
            {riderLoading ? (
              <Loading></Loading>
            ) : !riderData?.data?.length ? (
              <Empty description="No available riders found in this area." />
            ) : (
              <div className="space-y-3">
                {riderData.data.map((rider) => (
                  <div
                    key={rider.email}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">{rider.name}</p>

                      <p className="text-xs text-gray-500">
                        {rider.area}, {rider.district}
                      </p>

                      <p className="text-xs text-gray-400">{rider.email}</p>
                    </div>

                    <Button
                      type="primary"
                      size="small"
                      loading={isAssigning}
                      onClick={() =>
                        handleAssignRider(selectedOrder!._id, rider.email)
                      }
                    >
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Modal>
        </>
      )}
    </section>
  );
};

export default AdminOrders;
