// frontend/src/Layout/UserLayout.jsx
import React, { useEffect } from "react";
import { Link, useNavigate, Outlet, useActionData, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const UserLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user]);
  const navItems = [
    { to: "/user-dash/profile", label: "پروفایل" },
    { to: "/user-dash/settings", label: "تنظیمات" },
  ];
  if (!user) {
    return <Navigate to="signin"/>
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 min-h-screen py-8 px-4">
        <div className="font-bold text-xl mb-6">حساب کاربری</div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to} className="hover:bg-gray-700 rounded-md">
                <Link to={item.to} className="block py-2 px-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
