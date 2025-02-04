// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> // index is for the main "/" route
        </Route>

        {/* Authentication Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Protected user Routes */}
        <Route path="/user-dash" element={<UserLayout />}>
          <Route path="/user-dash/profile" element={<UserProfile />} />
        </Route>

        {/* Admin Routes with AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-products" element={<ManageProducts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
