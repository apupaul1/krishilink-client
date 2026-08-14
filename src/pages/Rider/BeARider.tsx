import {
  Button,
  Card,
  Form,
  Input,
  message,
  Result,
  Select,
  Tag,
  Typography,
  Upload,
  type UploadFile,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router";
import useRole from "../../hooks/useRole";
import {
  useCreateRiderMutation,
  useGetRidersQuery,
} from "../../redux/features/rider/riderApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { uploadImage } from "../../utils/uploadImage";
import { getAreaOptions, getDistrictOptions } from "../../utils/location";
import Loading from "../../components/shared/Loading/Loading";

const { Title, Paragraph } = Typography;

const BeARider = () => {
  const [form] = Form.useForm();

  const selectedDistrict = Form.useWatch("district", form);

  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading: applicationLoading } = useGetRidersQuery(
    user?.email ? { email: user.email } : skipToken,
  );

  const [createRider, { isLoading }] = useCreateRiderMutation();

  const application = data?.data?.[0];

  const { role, isLoading: roleLoading } = useRole();

  const navigate = useNavigate();

  if (roleLoading || applicationLoading) {
    return <Loading></Loading>;
  }

  if (role === "rider") {
    return (
      <Result
        status="success"
        title="You are already a verified Rider 🌾"
        subTitle="You can now start pickup and delivered Product."
        extra={
          <Button type="primary" onClick={() => navigate("/my-products")}>
            My Pickup
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

  interface RiderFormValues {
    name: string;
    email: string;
    district: string;
    area: string;
    address: string;
    drivingLicense: UploadFile[];
    nid: UploadFile[];
    bike: string;
  }

  const onFinish = async (values: RiderFormValues) => {
    try {
      const licenseFile = values.drivingLicense?.[0]?.originFileObj;
      const nidFile = values.nid?.[0]?.originFileObj;

      if (!licenseFile || !nidFile) {
        message.error("Please upload your Driving License and NID.");
        return;
      }

      const [drivingLicense, nid] = await Promise.all([
        uploadImage(licenseFile),
        uploadImage(nidFile),
      ]);

      await createRider({
        name: values.name,
        email: values.email,
        photoURL: user?.photoURL ?? "",

        district: values.district,
        area: values.area,
        address: values.address,

        drivingLicense,
        nid,
        bike: values.bike,
      }).unwrap();

      message.success("Rider application submitted successfully.");

      form.resetFields();
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
      <div className="mb-8">
        <Title level={2} className="mb-2!">
          Be a Rider 🚴
        </Title>

        <Paragraph type="secondary" className="max-w-2xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </Paragraph>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <Card className="lg:col-span-3">
          <div className="mb-6">
            <h3 className="mb-1 text-lg font-semibold">
              Tell us about yourself
            </h3>

            <p className="text-sm text-gray-500">
              Complete the information below to apply as a rider.
            </p>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Rider Details */}
            <div>
              <h3 className="mb-4 text-base font-semibold">Rider Details</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <Form.Item
                  initialValue={user?.displayName}
                  label="Rider Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name.",
                    },
                  ]}
                >
                  <Input placeholder="Apu Paul" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  initialValue={user?.email}
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email.",
                    },
                  ]}
                >
                  <Input placeholder="rider1@gmail.com" readOnly />
                </Form.Item>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="mb-4 text-base font-semibold">Regions</h3>

              <Form.Item
                label="District"
                name="district"
                rules={[
                  {
                    required: true,
                    message: "Please select your district.",
                  },
                ]}
              >
                <Select
                  placeholder="Select your district"
                  options={getDistrictOptions()}
                  onChange={() => {
                    form.setFieldValue("area", undefined);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Area"
                name="area"
                rules={[
                  {
                    required: true,
                    message: "Please select your area.",
                  },
                ]}
              >
                <Select
                  placeholder={
                    selectedDistrict
                      ? "Select Area / Upazila"
                      : "Select District First"
                  }
                  disabled={!selectedDistrict}
                  options={getAreaOptions(selectedDistrict)}
                />
              </Form.Item>

              <Form.Item
                label="Your Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your address.",
                  },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter your full address"
                />
              </Form.Item>
            </div>

            {/* More Details */}
            <div className="mb-6">
              <h3 className="mb-4 text-base font-semibold">More Details</h3>

              <div className="grid gap-5 md:grid-cols-3">
                <Form.Item
                  label="Driving License"
                  name="drivingLicense"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
                  rules={[
                    {
                      required: true,
                      message: "Please upload your driving license.",
                    },
                  ]}
                >
                  <Upload maxCount={1} beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Driving License</Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="NID"
                  name="nid"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
                  rules={[
                    {
                      required: true,
                      message: "Please upload your NID.",
                    },
                  ]}
                >
                  <Upload maxCount={1} beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>NID</Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="Bike"
                  name="bike"
                  rules={[
                    {
                      required: true,
                      message: "Please provide bike information.",
                    },
                  ]}
                >
                  <Input placeholder="Bike number / model" />
                </Form.Item>
              </div>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full"
              loading={isLoading}
            >
              Submit Rider Application
            </Button>
          </Form>
        </Card>

        {/* Lottie / Illustration */}
        <div className="flex min-h-125 flex-col items-center justify-center lg:col-span-2">
          {/* Rider Lottie এখানে বসবে */}
          {/* 
          <Lottie
            animationData={riderLottie}
            loop
            className="max-w-md"
          />
          */}

          <div className="mt-8 w-full max-w-md space-y-4">
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <h3 className="font-semibold">🚚 Flexible Delivery</h3>

              <p className="text-sm text-gray-600">
                Choose delivery opportunities that work for you.
              </p>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <h3 className="font-semibold">💰 Earn More</h3>

              <p className="text-sm text-gray-600">
                Earn by delivering parcels across your region.
              </p>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <h3 className="font-semibold">⚡ Fast & Reliable</h3>

              <p className="text-sm text-gray-600">
                Help customers get their parcels delivered safely and on time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeARider;
