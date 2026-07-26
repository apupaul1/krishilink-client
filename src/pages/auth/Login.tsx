import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, message, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { loginUser } from "../../redux/features/auth/auth.service";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";

const { Title, Text } = Typography;

export interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);
  

  console.log(location);

  useEffect(() => {
    if (user) {
      navigate(location?.state || "/");
    }
  }, [user, navigate]);

  const onFinish = async (values: LoginFormValues) => {
    try {
      await loginUser(values.email, values.password);
      message.success("Login successful.");
    } catch (error) {
      console.error(error);
      message.error("Invalid email or password.");
    }
  };

  return (
    <div className=" bg-white p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <Title level={2} className="mb-2">
          Welcome Back 👋
        </Title>

        <Text type="secondary">Login to continue shopping fresh products.</Text>
      </div>

      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Enter your email"
            className="rounded-xl!"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Enter your password"
            className="rounded-xl!"
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link
              to="/forgot-password"
              className="text-green-600 hover:text-green-700"
            >
              Forgot Password?
            </Link>
          </Flex>
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
          className="p-6! rounded-xl!"
        >
          Login
        </Button>

        {/* Social Login */}
        {/* <SocialLogin /> */}

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            state={location?.state}
            className="font-medium text-green-600 hover:text-green-700"
          >
            Register
          </Link>
        </p>
      </Form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
