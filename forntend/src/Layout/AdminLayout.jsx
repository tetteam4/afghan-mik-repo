// frontend/src/Layout/AdminLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white py-4 px-6">
        <div className="font-bold text-xl mb-4">پنل مدیریت</div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              داشبورد
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              مدیریت کاربران
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              مدیریت محصولات
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="block py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              مدیریت سفارشات
            </Link>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
