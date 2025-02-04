// frontend/src/pages/DashBord/UserDashBord.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";


const UserDashboard = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const navItems = [
    { to: "/dashboard", label: "جزئیات حساب" },
    { to: "/profile", label: "پروفایل من" },
    { to: "/order-history", label: "تاریخچه سفارشات" },
  ];
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      <div className="w-64 bg-gray-800 text-white py-4 px-6">
        <div className="font-bold text-xl mb-4">داشبورد کاربر</div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to} className="hover:bg-gray-700 rounded-md">
              <Link to={item.to} className="block py-2 px-4">
                {item.label}
              </Link>
            </li>
          ))}

          <li
            onClick={handleLogout}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            خروج
          </li>
        </ul>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Dynamic Content Based on Route */}
        {/* Add components here based on specific route */}
        {/* Example static content */}
        <div>
          <h1 className="text-2xl font-bold mb-4">صفحه اصلی</h1>
          <p>خلاصه حساب کاربری شما.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
