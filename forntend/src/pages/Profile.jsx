// frontend/src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { Mail, User, Phone, MapPin } from "lucide-react";

const Profile = () => {
  const { user } = useAuthStore();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform logic on submit
    console.log("handle submit action");
  };

  return (
    <div className="container mx-auto p-6 mt-8" dir="rtl">
      <h2 className="text-2xl font-bold mb-4">پروفایل من</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-4 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            نام کاربری
          </label>
          <Input
            icon={User}
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ایمیل
          </label>
          <Input
            icon={Mail}
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            اسم
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="shadow border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            نام خانوادگی
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="shadow border rounded w-full p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            تلفن
          </label>
          <Input
            icon={Phone}
            type="text"
            placeholder="تلفن"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            آدرس
          </label>
          <Input
            icon={MapPin}
            type="text"
            placeholder="آدرس"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          ذخیره اطلاعات
        </button>
      </form>
    </div>
  );
};

export default Profile;
