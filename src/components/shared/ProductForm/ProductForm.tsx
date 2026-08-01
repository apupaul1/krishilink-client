import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Typography,
  Upload,
} from "antd";
// import type { UploadFile } from "antd/es/upload/interface";

import { useEffect } from "react";
import type {
  IAddProductForm,
  IProduct,
} from "../../../redux/features/product/product.types";

const { Title } = Typography;

export interface ProductFormProps {
  mode: "create" | "edit";
  loading?: boolean;
  initialValues?: Partial<IProduct>;
  existingImages?: string[];
  onRemoveImage?: (url: string) => void;
  onSubmit: (values: IAddProductForm) => Promise<void>;
}

const categoryOptions = [
  { label: "Vegetables", value: "Vegetables" },
  { label: "Fruits", value: "Fruits" },
  { label: "Rice", value: "Rice" },
  { label: "Fish", value: "Fish" },
  { label: "Meat", value: "Meat" },
  { label: "Dairy", value: "Dairy" },
];

const unitOptions = [
  { label: "Kg", value: "kg" },
  { label: "Gram", value: "gram" },
  { label: "Piece", value: "piece" },
  { label: "Dozen", value: "dozen" },
  { label: "Liter", value: "liter" },
];

const districtOptions = [
  { label: "Dhaka", value: "Dhaka" },
  { label: "Chattogram", value: "Chattogram" },
  { label: "Khulna", value: "Khulna" },
  { label: "Rajshahi", value: "Rajshahi" },
  { label: "Sylhet", value: "Sylhet" },
  { label: "Barishal", value: "Barishal" },
  { label: "Rangpur", value: "Rangpur" },
  { label: "Mymensingh", value: "Mymensingh" },
];

const ProductForm = ({
  mode,
  loading,
  initialValues,
  onSubmit,
  existingImages,
  onRemoveImage,
}: ProductFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        category: initialValues.category,
        price: initialValues.price,
        stock: initialValues.stock,
        unit: initialValues.unit,
        description: initialValues.description,

        location: {
          district: initialValues.location?.district,
          area: initialValues.location?.area,
          address: initialValues.location?.address,
        },
      });
    }
  }, [form, initialValues]);

  const handleFinish = async (values: IAddProductForm) => {
    try {
      await onSubmit(values);

      if (mode === "create") {
        form.resetFields();
      }
    } catch (error) {}
  };

  return (
    <section className="mx-auto max-w-5xl p-6">
      <Card
        title={
          <Title level={2} className="p-6 text-center">
            {mode === "create" ? "Add New Product" : "Edit Product"}
          </Title>
        }
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          {/* Product Name */}
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter product name",
              },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          {/* Category & Unit */}
          <div className="grid gap-4 md:grid-cols-2">
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select category",
                },
              ]}
            >
              <Select placeholder="Select category" options={categoryOptions} />
            </Form.Item>

            <Form.Item
              label="Unit"
              name="unit"
              rules={[
                {
                  required: true,
                  message: "Please select unit",
                },
              ]}
            >
              <Select placeholder="Select unit" options={unitOptions} />
            </Form.Item>
          </div>

          {/* Price & Stock */}
          <div className="grid gap-4 md:grid-cols-2">
            <Form.Item
              label="Price (৳)"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please enter price",
                },
              ]}
            >
              <InputNumber className="w-full!" min={1} placeholder="Price" />
            </Form.Item>

            <Form.Item
              label="Stock"
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Please enter stock",
                },
              ]}
            >
              <InputNumber className="w-full!" min={1} placeholder="Stock" />
            </Form.Item>
          </div>

          {/* District & Area */}
          <div className="grid gap-4 md:grid-cols-2">
            <Form.Item
              label="District"
              name={["location", "district"]}
              rules={[
                {
                  required: true,
                  message: "Please select district",
                },
              ]}
            >
              <Select placeholder="Select district" options={districtOptions} />
            </Form.Item>

            <Form.Item
              label="Area / Upazila"
              name={["location", "area"]}
              rules={[
                {
                  required: true,
                  message: "Please enter area",
                },
              ]}
            >
              <Input placeholder="Enter area or upazila" />
            </Form.Item>
          </div>

          {/* Full Address */}
          <Form.Item
            label="Full Address"
            name={["location", "address"]}
            rules={[
              {
                required: true,
                message: "Please enter full address",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              showCount
              maxLength={300}
              placeholder="Village, Road, House No, Landmark"
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter product description",
              },
            ]}
          >
            <Input.TextArea
              rows={5}
              showCount
              maxLength={1000}
              placeholder="Describe your product..."
            />
          </Form.Item>

          {mode === "edit" && existingImages && (
            <div className="mb-6">
              <Title level={5}>Current Images ({existingImages.length})</Title>

              <div className="flex flex-wrap gap-4">
                {existingImages.map((image) => (
                  <div key={image} className="relative">
                    <img
                      src={image}
                      className="h-28 w-28 rounded-lg border object-cover"
                    />

                    <Popconfirm
                      title="Remove Image"
                      description="Remove this image?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onRemoveImage?.(image)}
                    >
                      <Button
                        danger
                        shape="circle"
                        size="small"
                        className="absolute -right-2 -top-2"
                      >
                        ✕
                      </Button>
                    </Popconfirm>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Images */}
          <Form.Item
            label={mode === "create" ? "Product Images" : "Add New Images"}
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={
              mode === "create"
                ? [
                    {
                      required: true,
                      message: "Please upload at least one image",
                    },
                  ]
                : []
            }
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              multiple
              maxCount={5}
              accept="image/*"
            >
              + Upload
            </Upload>
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            loading={loading}
            className="w-full"
          >
            {mode === "create" ? "Add Product" : "Update Product"}
          </Button>
        </Form>
      </Card>
    </section>
  );
};

export default ProductForm;
