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
import BecomeFarmer from "../pages/Farmer/BecomeFarmer";
import MyApplication from "../pages/Farmer/MyApplication";
import FarmerApplications from "../pages/Admin/FarmerApplications";
import UserManagement from "../pages/Admin/UserManagement";
import AdminRoute from "./AdminRoute";
import FarmerRoute from "./FarmerRoute";

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
            <BecomeFarmer></BecomeFarmer>
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
        path: "farmer-applications",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <FarmerApplications></FarmerApplications>
            </AdminRoute>
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
]);
