import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthListener from "./pages/auth/AuthListener";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#16A34A",
          colorSuccess: "#22C55E",
          colorWarning: "#F59E0B",
          colorError: "#EF4444",
          fontFamily: '"Fira Sans", sans-serif',
        },
      }}
    >
      <Provider store={store}>
        <AuthListener/>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
