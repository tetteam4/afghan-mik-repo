// frontend/src/Layout/AdminLayout.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AdminLayout = () => {
  const { user } = useContext(AppContext);
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminLayout;
