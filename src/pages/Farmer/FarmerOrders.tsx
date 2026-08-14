import { Button, Empty, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useAppSelector } from "../../redux/hooks";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/order/orderApi";
import { Link } from "react-router";
import Loading from "../../components/shared/Loading/Loading";

const { Title, Paragraph, Text } = Typography;

interface IFarmerOrder {
  _id: string;
  trackingId: string;

  customerEmail: string;

  farmerEmail: string;

  items: {
    productId: string;
    name: string;
    image: string;
    unit: string;
    quantity: number;
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
  updatedAt: string;
}

const statusColor: Record<string, string> = {
  pending: "gold",
  preparing: "blue",
  ready_for_pickup: "green",
  assigned: "cyan",
  picked_up: "purple",
  out_for_delivery: "orange",
  delivered: "green",
  cancelled: "red",
};

const FarmerOrders = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderStatusMutation();

  const { data, isLoading } = useGetAllOrdersQuery(
    {
      farmerEmail: user?.email,
    },
    {
      skip: !user?.email,
    },
  );

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({
        orderId,
        status,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const columns: ColumnsType<IFarmerOrder> = [
    {
      title: "Products",
      dataIndex: "items",
      render: (items: IFarmerOrder["items"]) => (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.productId}>
              <p className="font-medium">
                {item.name} ( {item.quantity} {item.unit} )
              </p>
            </div>
          ))}
        </div>
      ),
    },

    {
      title: "Tracking ID",
      dataIndex: "trackingId",
      render: (trackingId: string) => (
        <Link to={`/trackings/${trackingId}`}>
          <Text code className="cursor-pointer">
            {trackingId}
          </Text>
        </Link>
      ),
    },

    {
      title: "Customer",
      key: "customer",
      render: (_, record) => (
        <div>
          <p className="font-medium">{record.shippingAddress.name}</p>

          <p className="text-xs text-gray-500">
            {record.shippingAddress.phone}
          </p>

          <p className="text-xs text-gray-400">{record.customerEmail}</p>
        </div>
      ),
    },

    {
      title: "Delivery Address",
      key: "shippingAddress",
      render: (_, record) => {
        const address = record.shippingAddress;

        return (
          <div className="max-w-55">
            <p className="text-sm font-medium">
              {address.area}, {address.district}
            </p>

            <p className="text-xs text-gray-500">{address.address}</p>

            {address.note && (
              <p className="mt-1 text-xs text-orange-500">
                Note: {address.note}
              </p>
            )}
          </div>
        );
      },
    },

    {
      title: "Order Value",
      dataIndex: "subtotal",
      render: (subtotal: number) => (
        <span className="font-semibold">৳ {subtotal.toLocaleString()}</span>
      ),
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },

    {
      title: "Order Status",
      dataIndex: "orderStatus",
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
      render: (_, record) => (
        <div className="flex gap-2">
          {record.orderStatus === "pending" && (
            <Button
              type="primary"
              size="small"
              loading={isUpdatingStatus}
              onClick={() => handleStatusUpdate(record._id, "preparing")}
            >
              Start Preparing
            </Button>
          )}

          {record.orderStatus === "preparing" && (
            <Button
              type="primary"
              size="small"
              loading={isUpdatingStatus}
              onClick={() => handleStatusUpdate(record._id, "ready_for_pickup")}
            >
              Ready for Pickup
            </Button>
          )}

          {record.orderStatus === "ready_for_pickup" && (
            <Button size="small" disabled>
              Waiting for Rider
            </Button>
          )}

          {record.orderStatus === "picked_up" && (
            <Button size="small" disabled>
              Picked Up
            </Button>
          )}
        </div>
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
          Incoming Orders
        </Title>

        <Paragraph className="text-gray-500!">
          View and manage orders containing your products.
        </Paragraph>
      </div>

      {!data?.data?.length ? (
        <div className="rounded-xl border border-gray-200 bg-white py-20">
          <Empty description="No incoming orders yet." />
        </div>
      ) : (
        <Table
          rowKey="orderId"
          columns={columns}
          dataSource={data.data}
          pagination={{
            pageSize: 10,
          }}
        />
      )}
    </section>
  );
};

export default FarmerOrders;
