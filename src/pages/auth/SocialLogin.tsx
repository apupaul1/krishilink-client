import { GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, message } from "antd";
import { loginWithGoogle } from "../../redux/features/auth/auth.service";
import { useLocation, useNavigate } from "react-router";
import { useCreateUserMutation } from "../../redux/features/user/userApi";

const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [createUser] = useCreateUserMutation();

  const handleGoogleLogin = async () => {
    try {
      const { user } = await loginWithGoogle();

      await createUser({
        name: user.displayName!,
        email: user.email!,
        photoURL: user.photoURL ?? "",
      }).unwrap();

      message.success("Login successful.");

      navigate(location?.state || "/");
    } catch (error) {
      console.error(error);
      message.error("Google login failed.");
    }
  };
  return (
    <div className="mt-6">
      <Divider className="text-gray-400!">OR</Divider>

      <Button
        size="large"
        block
        icon={<GoogleOutlined />}
        onClick={handleGoogleLogin}
        className="h-12! rounded-xl! border-gray-300! hover:border-green-500!"
      >
        Continue with Google
      </Button>
    </div>
  );
};

export default SocialLogin;
