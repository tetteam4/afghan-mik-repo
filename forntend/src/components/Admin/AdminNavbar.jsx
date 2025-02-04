// frontend/src/components/AdminNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const AdminNavbar = () => {
  const { logout, user } = useAuthStore();

  return (
    <>
      <Link
        to="/admin"
        className="block text-white hover:bg-gray-700 py-2 px-4 rounded-md"
      >
        داشبورد
      </Link>
      <Link
        to="/admin/manage-users"
        className="block text-white hover:bg-gray-700 py-2 px-4 rounded-md"
      >
        مدیریت کاربران
      </Link>
      <Link
        to="/admin/manage-products"
        className="block text-white hover:bg-gray-700 py-2 px-4 rounded-md"
      >
        مدیریت محصولات
      </Link>
    </>
  );
};

export default AdminNavbar;