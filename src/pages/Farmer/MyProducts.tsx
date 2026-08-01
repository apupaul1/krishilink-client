import {
  Button,
  Image,
  message,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useAppSelector } from "../../redux/hooks";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/features/product/productsApi";
import type { IProduct } from "../../redux/features/product/product.types";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router";

const { Title, Paragraph } = Typography;

const MyProducts = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading } = useGetProductsQuery(user?.email);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const columns: ColumnsType<IProduct> = [
    {
      title: "Image",
      dataIndex: "images",
      render: (images: string[]) => (
        <Image width={60} height={60} src={images[0]} />
      ),
    },

    {
      title: "Product",
      dataIndex: "name",
    },

    {
      title: "Category",
      dataIndex: "category",
    },

    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `৳ ${price}`,
    },

    {
      title: "Stock",
      dataIndex: "stock",
    },

    {
      title: "Status",
      dataIndex: "isAvailable",
      render: (status: boolean) =>
        status ? (
          <Tag color="green">Available</Tag>
        ) : (
          <Tag color="red">Out of Stock</Tag>
        ),
    },

    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Link to={`/products/edit/${record._id}`}>
            <Button icon={<EditOutlined />}>Edit</Button>
          </Link>

          <Popconfirm
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button
              danger
              loading={deletingId === record._id}
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteProduct(id).unwrap();

      message.success(res.message);
    } catch (error) {
      console.error(error);
      message.error("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="space-y-8 max-w-7xl mx-auto py-8">
      {/* Header */}
      <div className="text-center">
        <Title level={2} className="mb-2!">
          My Products ({data?.data.length ?? 0})
        </Title>

        <Paragraph type="secondary" className="mb-0!">
          Manage your listed products. You can view, update, or remove them
          anytime.
        </Paragraph>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <Table
          rowKey="_id"
          loading={isLoading}
          columns={columns}
          dataSource={data?.data}
        />
      </div>
    </section>
  );
};

export default MyProducts;
