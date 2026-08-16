import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Products from "../pages/Products/Products";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import AddProduct from "../pages/Farmer/AddProduct";
import MyProducts from "../pages/Farmer/MyProducts";
import EditProduct from "../pages/Farmer/EditProduct";
import MyApplication from "../pages/Farmer/MyApplication";
import ApproveFarmer from "../pages/Admin/ApproveFarmer";
import UserManagement from "../pages/Admin/UserManagement";
import AdminRoute from "./AdminRoute";
import FarmerRoute from "./FarmerRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import BeARider from "../pages/Rider/BeARider";
import BeAFarmer from "../pages/Farmer/BeAFarmer";
import ApproveRider from "../pages/Admin/ApproveRider";
import MyRiderApplication from "../pages/Rider/MyRiderApplication";
import MyOrders from "../pages/MyOrders/MyOrders";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import FarmerOrders from "../pages/Farmer/FarmerOrders";
import AdminOrders from "../pages/Admin/AdminOrders";
import RiderRoute from "./RiderRoute";
import RiderOrders from "../pages/Rider/RiderOrders";
import Tracking from "../pages/Tracking/Tracking";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFail from "../pages/Payment/PaymentFail";
import PaymentCancel from "../pages/Payment/PaymentCancel";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "/trackings/:trackingId",
        element: <Tracking></Tracking>,
      },

      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },

      {
        path: "/payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/fail",
        element: <PaymentFail />,
      },
      {
        path: "/payment/cancel",
        element: <PaymentCancel />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },

      {
        path: "products/edit/:id",
        element: (
          <PrivateRoute>
            <EditProduct></EditProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/be-a-farmer",
        element: (
          <PrivateRoute>
            <BeAFarmer></BeAFarmer>
          </PrivateRoute>
        ),
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <FarmerRoute>
              <MyProducts></MyProducts>
            </FarmerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "farmer-application",
        element: (
          <PrivateRoute>
            <MyApplication />
          </PrivateRoute>
        ),
      },
      {
        path: "rider-application",
        element: (
          <PrivateRoute>
            <MyRiderApplication></MyRiderApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UserManagement></UserManagement>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },

      {
        path: "pending-farmer-orders",
        element: <FarmerOrders></FarmerOrders>,
      },

      {
        path: "payments-history",
        element: <PaymentHistory></PaymentHistory>,
      },

      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <FarmerRoute>
              <AddProduct></AddProduct>
            </FarmerRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "approve-farmer",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ApproveFarmer></ApproveFarmer>
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "approve-rider",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ApproveRider></ApproveRider>
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "all-orders",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminOrders></AdminOrders>
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "delivery-order",
        element: (
          <RiderRoute>
            <RiderOrders></RiderOrders>
          </RiderRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },

  {
    path: "/unauthorized",
    element: <Unauthorized></Unauthorized>,
  },
]);
