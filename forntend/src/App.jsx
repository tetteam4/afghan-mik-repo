// frontend/src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";

// Layouts
import Layout from "./Layout/Layout";
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";
// Public Pages
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// User Pages
import UserProfile from "./pages/Profile/UserProfile";
// Admin Pages
import AdminDashboard from "./pages/DashBord/AdminDashBord.jsx";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageProducts from "./pages/Admin/ManageProducts";
import Order from "./pages/Order";
import SellerDashboard from "./pages/DashBord/SellerDashBord";
import { Upload } from "lucide-react";

const App = () => {
  const { user, isAdmin } = useAuthStore();
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {user ? (
          <>
            <Route path="/user-dash" element={<UserLayout />}>
              <Route path="/user-dash/profile" element={<UserProfile />} />
            </Route>

            <Route path="/order" element={<Order />} />
            {user.role === "seller" && (
              <Route path="/seller-dash" element={<SellerDashboard />}>
                <Route
                  path="/seller-dash/manage-products"
                  element={<ManageProducts />}
                />
              </Route>
            )}
            {isAdmin ? (
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/manage-users" element={<ManageUsers />} />
                <Route
                  path="/admin/manage-products"
                  element={<ManageProducts />}
                />
              </Route>
            ) : null}
          </>
        ) : (
          // If no user is logged in, route back to signin
          <Route path="*" element={<Navigate to="/signin" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
