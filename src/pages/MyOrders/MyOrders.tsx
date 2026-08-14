import {
  Button,
  Descriptions,
  Drawer,
  Empty,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import { EyeOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useAppSelector } from "../../redux/hooks";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/order/orderApi";
import { Link } from "react-router";
import Loading from "../../components/shared/Loading/Loading";

const { Title, Paragraph, Text } = Typography;

const MyOrders = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading } = useGetAllOrdersQuery(
    {
      email: user?.email,
    },
    {
      skip: !user?.email,
    },
  );

  const [updateOrderStatus, { isLoading: isCancelling }] =
    useUpdateOrderStatusMutation();

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus({
        orderId: orderId,
        status: "cancelled",
      }).unwrap();

      message.success("Order cancelled successfully.");

      setDrawerOpen(false);
    } catch (error) {
      console.error(error);

      message.error("Failed to cancel order.");
    }
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "gold",
      confirmed: "blue",
      processing: "processing",
      ready_for_pickup: "cyan",
      assigned: "purple",
      picked_up: "geekblue",
      out_for_delivery: "orange",
      delivered: "green",
      cancelled: "red",
    };

    return colors[status] || "default";
  };

  const columns = [
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
      title: "Recipient Info",
      dataIndex: "shippingAddress",
      render: (address: any) => (
        <div className="max-w-xs">
          <p className="font-medium">{address.name}</p>

          <p className="text-sm text-gray-500">{address.phone}</p>

          <p className="text-sm text-gray-500">
            {address.area}, {address.district}
          </p>

          <p className="text-sm text-gray-500">{address.address}</p>
        </div>
      ),
    },

    {
      title: "Order Details",
      key: "orderDetails",
      render: (_: unknown, record: any) => (
        <div className="space-y-2">
          {/* Items */}
          <div className="space-y-1">
            {record.items?.map((item: any) => (
              <div key={item.productId} className="text-sm">
                <span className="font-medium text-gray-800">{item.name}</span>

                <span className="ml-2 text-xs text-gray-500">
                  ({item.quantity} {item.unit})
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className=" text-sm">
            <span className="text-gray-500">Total: </span>
            <span className="font-semibold text-gray-900">
              ৳ {record.totalAmount?.toLocaleString()}
            </span>
          </div>

          {/* Date */}
          <p className=" text-gray-400">
            {new Date(record.createdAt).toLocaleString()}
          </p>
        </div>
      ),
    },

    {
      title: "Payement Method",
      dataIndex: "paymentMethod",
      render: (method: string) => (
        <span className="font-semibold flex justify-center">
          {method.toUpperCase()}
        </span>
      ),
    },

    {
      title: "Payment",
      dataIndex: "paymentStatus",
      render: (status: string) => (
        <Tag
          color={
            status === "paid" ? "green" : status === "failed" ? "red" : "gold"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.replaceAll("_", " ").toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Action",
      render: (_: unknown, record: any) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>

          {record.orderStatus === "pending" && (
            <Popconfirm
              title="Cancel this order?"
              description="This action cannot be undone."
              okText="Yes, cancel"
              cancelText="No"
              onConfirm={() => handleCancelOrder(record._id)}
            >
              <Button
                type="link"
                danger
                icon={<CloseOutlined />}
                loading={isCancelling && selectedOrder?._id === record._id}
              >
                Cancel
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!data?.data?.length) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white px-6 py-16">
        <Empty
          //   image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <p className="text-base font-medium text-gray-700">
                No orders yet
              </p>
              <p className="mt-1 text-sm text-gray-400 mb-4">
                Your placed orders will appear here.
              </p>
              <Link to={"/products"}>
                <Button type="primary">Browser Products</Button>
              </Link>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <section>
      <div className="my-7">
        <Title level={2} className="mb-1!">
          My Orders ({data?.data?.length})
        </Title>

        <Paragraph className="text-gray-500!">
          Track and manage all your orders.
        </Paragraph>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data.data}
        pagination={{
          pageSize: 10,
        }}
      />

      {/* Order Details */}
      <Drawer
        title="Order Details"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={520}
      >
        {selectedOrder && (
          <div>
            {/* Order Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <Text type="secondary">Tracking ID</Text>

                <p className="font-mono font-semibold">
                  {selectedOrder.trackingId}
                </p>
              </div>

              <Tag color={getStatusColor(selectedOrder.orderStatus)}>
                {selectedOrder.orderStatus.replaceAll("_", " ").toUpperCase()}
              </Tag>
            </div>

            {/* Recipient */}
            <Title level={5}>Delivery Information</Title>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Name">
                {selectedOrder.shippingAddress.name}
              </Descriptions.Item>

              <Descriptions.Item label="Phone">
                {selectedOrder.shippingAddress.phone}
              </Descriptions.Item>

              <Descriptions.Item label="District">
                {selectedOrder.shippingAddress.district}
              </Descriptions.Item>

              <Descriptions.Item label="Area">
                {selectedOrder.shippingAddress.area}
              </Descriptions.Item>

              <Descriptions.Item label="Address">
                {selectedOrder.shippingAddress.address}
              </Descriptions.Item>

              {selectedOrder.shippingAddress.note && (
                <Descriptions.Item label="Note">
                  {selectedOrder.shippingAddress.note}
                </Descriptions.Item>
              )}
            </Descriptions>

            {/* Products */}
            <Title level={5} className="mt-8!">
              Ordered Products
            </Title>

            <div className="rounded-lg border">
              {selectedOrder.items.map((item: any) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between gap-4 border-b p-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>

                    <p className="text-sm text-gray-500">
                      {item.quantity} {item.unit} × ৳{" "}
                      {item.price.toLocaleString()}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ৳ {(item.quantity * item.price).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <Title level={5} className="mt-8!">
              Payment Summary
            </Title>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Subtotal">
                ৳{selectedOrder.subtotal}
              </Descriptions.Item>

              <Descriptions.Item label="Delivery">
                ৳{selectedOrder.deliveryCharge}
              </Descriptions.Item>

              <Descriptions.Item label="Total">
                <strong>৳{selectedOrder.totalAmount}</strong>
              </Descriptions.Item>

              <Descriptions.Item label="Method">
                {selectedOrder.paymentMethod.toUpperCase()}
              </Descriptions.Item>

              <Descriptions.Item label="Payment Status">
                <Tag
                  color={
                    selectedOrder.paymentStatus === "paid" ? "green" : "gold"
                  }
                >
                  {selectedOrder.paymentStatus.toUpperCase()}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            {/* Actions */}
          </div>
        )}
      </Drawer>
    </section>
  );
};

export default MyOrders;
