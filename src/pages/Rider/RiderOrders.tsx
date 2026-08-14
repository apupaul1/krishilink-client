import {
  Button,
  Empty,
  message,
  Popconfirm,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";

import { useAppSelector } from "../../redux/hooks";
import {
  useGetAllOrdersQuery,
  useRejectRiderMutation,
  useUpdateOrderStatusMutation,
} from "../../redux/features/order/orderApi";

const { Title, Paragraph } = Typography;

interface IRiderOrder {
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

  paymentMethod: string;
  paymentStatus: string;

  orderStatus: string;

  riderEmail: string | null;

  createdAt: string;
}

const statusColor: Record<string, string> = {
  waiting_for_rider_acceptance: "gold",
  rider_assigned: "blue",
  picked_up: "purple",
  out_for_delivery: "orange",
  delivered: "green",
  rejected: "red",
};

const RiderOrders = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetAllOrdersQuery(
    {
      riderEmail: user?.email,
    },
    {
      skip: !user?.email,
    },
  );

  const [rejectRider, { isLoading: isRejecting }] = useRejectRiderMutation();

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({
        orderId,
        status,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectRider = async (orderId: string) => {
    try {
      await rejectRider(orderId).unwrap();

      message.success("Order rejected successfully.");
    } catch (error) {
      console.error(error);
      message.error("Failed to reject the order.");
    }
  };

  const columns: ColumnsType<IRiderOrder> = [
    {
      title: "Customer",
      key: "customer",
      width: 170,
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
      title: "Pickup",
      key: "pickup",
      width: 190,
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
      title: "Delivery",
      key: "delivery",
      width: 200,
      render: (_, record) => (
        <div>
          <p className="text-sm font-medium">
            {record.shippingAddress.area}, {record.shippingAddress.district}
          </p>

          <p className="line-clamp-2 text-xs text-gray-500">
            {record.shippingAddress.address}
          </p>
        </div>
      ),
    },

    {
      title: "Products",
      dataIndex: "items",
      width: 220,
      render: (items: IRiderOrder["items"]) => (
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
      title: "Status",
      dataIndex: "orderStatus",
      width: 180,
      render: (status: string) => (
        <Tag color={statusColor[status] || "default"}>
          {status.replaceAll("_", " ").toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 160,
      render: (_, record) => {
        if (record.orderStatus === "waiting_for_rider_acceptance") {
          return (
            <div className="flex gap-2">
              <Popconfirm
                title="Accept this delivery?"
                description="You will be responsible for picking up and delivering this order."
                okText="Yes, Accept"
                cancelText="Cancel"
                onConfirm={() =>
                  handleStatusUpdate(record._id, "rider_assigned")
                }
              >
                <Button type="primary" size="small" loading={isUpdating}>
                  Accept
                </Button>
              </Popconfirm>

              <Popconfirm
                title="Reject this delivery?"
                description="The order will be returned to the ready-for-pickup list."
                okText="Yes, Reject"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
                onConfirm={() => handleRejectRider(record._id)}
              >
                <Button danger size="small" loading={isRejecting}>
                  Reject
                </Button>
              </Popconfirm>
            </div>
          );
        }

        if (record.orderStatus === "rider_assigned") {
          return (
            <Button
              type="primary"
              size="small"
              loading={isUpdating}
              onClick={() => handleStatusUpdate(record._id, "picked_up")}
            >
              Picked Up
            </Button>
          );
        }

        if (record.orderStatus === "picked_up") {
          return (
            <Button
              type="primary"
              size="small"
              loading={isUpdating}
              onClick={() => handleStatusUpdate(record._id, "out_for_delivery")}
            >
              Start Delivery
            </Button>
          );
        }

        if (record.orderStatus === "out_for_delivery") {
          return (
            <Button
              type="primary"
              size="small"
              loading={isUpdating}
              onClick={() => handleStatusUpdate(record._id, "delivered")}
            >
              Delivered
            </Button>
          );
        }

        if (record.orderStatus === "delivered") {
          return <Tag color="green">Completed</Tag>;
        }

        return null;
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <Title level={2} className="mb-1!">
          My Deliveries
        </Title>

        <Paragraph className="text-gray-500!">
          Manage your assigned deliveries.
        </Paragraph>
      </div>

      {!data?.data?.length ? (
        <div className="rounded-xl border border-gray-200 bg-white py-20">
          <Empty description="No deliveries assigned yet." />
        </div>
      ) : (
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data.data}
          pagination={{
            pageSize: 10,
          }}
          scroll={{ x: 1100 }}
        />
      )}
    </section>
  );
};

export default RiderOrders;
