import { Spin } from "antd";

interface LoadingProps {
  fullScreen?: boolean;
  size?: "small" | "default" | "large";
  description?: string;
}

const Loading = ({
  fullScreen = false,
  size = "large",
  description = "Loading...",
}: LoadingProps) => {
  return (
    <div
      className={
        fullScreen
          ? "flex min-h-screen items-center justify-center bg-slate-50"
          : "flex min-h-75 items-center justify-center"
      }
    >
      <Spin size={size} description={description} />
    </div>
  );
};

export default Loading;
