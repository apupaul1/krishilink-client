import { Button, Empty, Spin, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";

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

  riderId: string | null;

  createdAt: string;
}

const AdminOrders = () => {
  const { data, isLoading } = useGetAllOrdersQuery({
    status: "ready_for_pickup",
  });

  console.log(data);

  const columns: ColumnsType<IAdminOrder> = [
    {
      title: "Customer",
      key: "customer",
      width: 160,
      render: (_, record) => (
        <div>
          <p className="font-medium">
            {record.shippingAddress.name}
          </p>

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
      render: (email: string) => (
        <span className="text-sm">
          {email}
        </span>
      ),
    },

    {
      title: "Products",
      dataIndex: "items",
      width: 220,
      render: (items: IAdminOrder["items"]) => (
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.productId}>
              <p className="text-sm font-medium">
                {item.name}
              </p>

              <p className="text-xs text-gray-500">
                {item.quantity} {item.unit}
              </p>
            </div>
          ))}
        </div>
      ),
    },

    // {
    //   title: "Pickup Location",
    //   key: "farmerLocation",
    //   width: 200,
    //   render: (_, record) => (
    //     <div>
    //       <p className="text-sm font-medium">
    //         {record.farmerLocation.area},{" "}
    //         {record.farmerLocation.district}
    //       </p>

    //       <p className="line-clamp-2 text-xs text-gray-500">
    //         {record.farmerLocation.address}
    //       </p>
    //     </div>
    //   ),
    // },

    {
      title: "Order Value",
      dataIndex: "subtotal",
      width: 110,
      render: (subtotal: number) => (
        <span className="font-semibold">
          ৳ {subtotal.toLocaleString()}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "orderStatus",
      width: 140,
      render: (status: string) => (
        <Tag color="green">
          {status.replaceAll("_", " ").toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 130,
      fixed: "right",
      render: () => (
        <Button
          type="primary"
          size="small"
        >
          Assign Rider
        </Button>
      ),
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

export default AdminOrders;