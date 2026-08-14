import { Spin } from "antd";

interface LoadingProps {
  fullScreen?: boolean;
  size?: "small" | "default" | "large";
  tip?: string;
}

const Loading = ({
  fullScreen = false,
  size = "large",
  tip = "Loading...",
}: LoadingProps) => {
  return (
    <div
      className={
        fullScreen
          ? "flex min-h-screen items-center justify-center bg-slate-50"
          : "flex min-h-75 items-center justify-center"
      }
    >
      <Spin size={size} tip={tip} />
    </div>
  );
};

export default Loading;
