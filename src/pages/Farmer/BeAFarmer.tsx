import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Result,
  Select,
  Spin,
  Tag,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "../../redux/hooks";
import {
  useCreateFarmerMutation,
  useGetFarmersQuery,
} from "../../redux/features/farmer/farmerApi";
import useRole from "../../hooks/useRole";

const { Title, Paragraph } = Typography;

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

const farmTypeOptions = [
  "Vegetables",
  "Fruits",
  "Rice",
  "Fish",
  "Meat",
  "Dairy",
  "Poultry",
  "Mixed Farming",
].map((item) => ({
  label: item,
  value: item,
}));

interface FarmerApplicationFormValues {
  phone: string;

  nid: string;

  district: string;

  area: string;

  address: string;

  farmTypes: string[];

  experience: number;

  about?: string;
}

const BeAFarmer = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading: applicationLoading } = useGetFarmersQuery(
    user?.email ? { email: user.email } : skipToken,
  );

  const application = data?.data?.[0];

  const { role, isLoading: roleLoading } = useRole();

  const [createFarmerApplication, { isLoading }] = useCreateFarmerMutation();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  if (roleLoading || applicationLoading) {
    return <Spin size="large" />;
  }

  if (role === "farmer") {
    return (
      <Result
        status="success"
        title="You are already a verified farmer 🌾"
        subTitle="You can now manage and sell your products."
        extra={
          <Button type="primary" onClick={() => navigate("/my-products")}>
            My Products
          </Button>
        }
      />
    );
  }

  if (application && application.status !== "rejected") {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center p-6">
        <Result
          status={application.status === "approved" ? "success" : "info"}
          title={
            application.status === "approved"
              ? "🎉 Congratulations!"
              : "Application Under Review"
          }
          subTitle={
            application.status === "approved"
              ? "Your farmer account has been approved. You can now start selling your products."
              : "We've received your application. Our team is reviewing it and will update you soon."
          }
          extra={[
            <Tag
              key="status"
              color={application.status === "approved" ? "green" : "gold"}
            >
              {application.status.toUpperCase()}
            </Tag>,

            <Link key="view" to="/my-application">
              <Button type="primary">View Application</Button>
            </Link>,

            application.status === "approved" ? (
              <Link key="products" to="/my-products">
                <Button>My Products</Button>
              </Link>
            ) : null,
          ]}
        />
      </section>
    );
  }

  const onFinish = async (values: FarmerApplicationFormValues) => {
    try {
      if (!user?.email) {
        message.error("User not found.");
        return;
      }

      await createFarmerApplication({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL ?? "",

        phone: values.phone,
        nid: values.nid,

        district: values.district,
        area: values.area,
        address: values.address,

        farmTypes: values.farmTypes,

        experience: values.experience,

        about: values.about,
      }).unwrap();

      message.success("Application submitted successfully.");

      form.resetFields();

      // navigate("/dashboard");
    } catch (error) {
      const err = error as {
        status: number;
        data: {
          success: boolean;
          message: string;
        };
      };

      message.error(err.data.message);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-3 ">
          <div className="mb-8">
            <Title level={2}>Become a Farmer</Title>

            <Paragraph type="secondary">
              Complete the form below to apply as a verified farmer on
              KrishiLink. Once approved, you will be able to sell your products
              directly to customers.
            </Paragraph>
          </div>

          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="grid gap-4 md:grid-cols-2">
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="NID Number"
                name="nid"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Form.Item
                label="District"
                name="district"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select options={districtOptions} />
              </Form.Item>
              <Form.Item
                label="Area / Upazila"
                name="area"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            <Form.Item
              label="Full Address"
              name="address"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              label="Farm Types"
              name="farmTypes"
              rules={[
                {
                  required: true,
                  message: "Please select at least one farm type.",
                },
              ]}
            >
              <Checkbox.Group options={farmTypeOptions} />
            </Form.Item>

            <Form.Item
              label="Experience (Years)"
              name="experience"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={0} className="w-full!" />
            </Form.Item>

            <Form.Item label="About Yourself" name="about">
              <Input.TextArea
                rows={4}
                showCount
                maxLength={500}
                placeholder="Tell us about yourself..."
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full"
              loading={isLoading}
            >
              Submit Application
            </Button>
          </Form>
        </Card>
        <div className="flex flex-col items-center justify-center lg:col-span-2">
          {/* <Lottie animationData={farmerLottie} loop className="max-w-md" /> */}

          <div className="mt-8 space-y-5">
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <h3 className="font-semibold">🌱 Direct Selling</h3>

              <p className="text-sm text-gray-600">
                Sell directly to customers without middlemen.
              </p>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <h3 className="font-semibold">💰 Better Profit</h3>

              <p className="text-sm text-gray-600">
                Earn more from every harvest you sell.
              </p>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <h3 className="font-semibold">🚚 Easy Delivery</h3>

              <p className="text-sm text-gray-600">
                KrishiLink riders will deliver your products safely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeAFarmer;
