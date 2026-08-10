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
        path: "/add-product",
        element: (
          <PrivateRoute>
            <FarmerRoute>
              <AddProduct></AddProduct>
            </FarmerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoute>
            <FarmerRoute>
              <MyProducts></MyProducts>
            </FarmerRoute>
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
      {
        path: "my-application",
        element: (
          <PrivateRoute>
            <MyApplication></MyApplication>
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
        path: "approve-farmer",
        element: (
          <PrivateRoute>
            {/* <AdminRoute>
            </AdminRoute> */}
            <ApproveFarmer></ApproveFarmer>
          </PrivateRoute>
        ),
      },

      {
        path: "approve-rider",
        element: (
          <PrivateRoute>
            {/* <AdminRoute>
            </AdminRoute> */}
            <ApproveRider></ApproveRider>
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
    element: <DashboardLayout />,
    children: [
      // {
      //   index: true,
      //   element: <DashboardHome />,
      // },
      // {
      //   path: "my-products",
      //   element: <MyProducts />,
      // },
      // {
      //   path: "my-orders",
      //   element: <MyOrders />,
      // },
      {
        path: "my-application",
        element: <MyApplication />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
    ],
  },
]);
