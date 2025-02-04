// frontend/src/pages/UserDashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const UserDashboard = () => {
  const userData = {
    name: "Karim Hakimi",
    email: "karim@gmail.com",
    profileImage: "https://placekitten.com/100/100",
    // Add other user-specific data here
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Image and Info */}
        <div className="lg:w-1/4 p-4 bg-white rounded-md shadow-md text-center">
          <img
            src={userData.profileImage}
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
          />
          <h2 className="text-xl font-bold mb-2">{userData.name}</h2>
          <p className="text-gray-700">{userData.email}</p>
        </div>
        {/* Dashboard Content */}
        <div className="lg:w-3/4 p-4 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">داشبورد کاربر</h1>
          {/* Edit Profile Form */}
          <form className="flex flex-col gap-3">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                نام و تخلص
              </label>
              <input
                type="text"
                id="name"
                defaultValue={userData.name}
                className="shadow border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                defaultValue={userData.email}
                className="shadow border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            {/* Add other fields as needed */}
            <button className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
              ذخیره تغییرات
            </button>
          </form>

          <ul className="mt-8 space-y-2">
            <li>
              <Link to="#" className="text-blue-500 hover:underline">
                سفارشات من
              </Link>
            </li>
            <li>
              <Link to="#" className="text-blue-500 hover:underline">
                علاقه‌مندی‌ها
              </Link>
            </li>
            {/* Add other menu items here */}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
