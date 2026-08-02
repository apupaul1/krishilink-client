import {
  LockOutlined,
  MailOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { Button, Form, Input, Typography, Upload } from "antd";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import {
  registerUser,
  updateUserProfile,
} from "../../redux/features/auth/auth.service";
import { message } from "antd";
import { useCreateUserMutation } from "../../redux/features/user/userApi";
import { uploadImage } from "../../utils/uploadImage";
import { useState } from "react";


const { Title, Text } = Typography;

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  photo: UploadFile[];
}

const Register = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [createUser] = useCreateUserMutation();


  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const files = values.photo as UploadFile[];

      const photoURL = await uploadImage(files[0].originFileObj as File);

      const { user } = await registerUser(values.email, values.password);

      await updateUserProfile({
        displayName: values.name,
        photoURL,
      });

      await user.reload();

      await createUser({
        name: values.name,
        email: values.email,
        photoURL,
      }).unwrap();

      message.success("Account created successfully.");

      navigate(location?.state || "/");
    } catch (error) {
      console.error(error);
      message.error("Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 mt-6">
      {/* Header */}
      <div className="mb-4 text-center">
        <Title level={2} className="mb-1!">
          Create Account 👋
        </Title>

        <Text type="secondary">
          Join KrishiLink and buy fresh products directly from farmers.
        </Text>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        {/* Profile Photo */}
        <Form.Item
          label="Profile Photo"
          name="photo"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
          rules={[
            {
              required: true,
              message: "Please upload a profile photo",
            },
          ]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        {/* Full Name */}
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Enter your full name"
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="Enter your email"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
          className="p-10"
          loading={loading}
        >
          Create Account
        </Button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium text-green-600">
            Login
          </Link>
        </p>
      </Form>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
