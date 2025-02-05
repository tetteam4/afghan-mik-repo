// frontend/src/pages/Profile/UserProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isSellerRequestSent, setIsSellerRequestSent] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      setFirstName(user.profile?.firstName || "");
      setLastName(user.profile?.lastName || "");
      setPhone(user.profile?.phone || "");
      setAddress(user.profile?.address || "");
      setEmail(user.email || "");
      setUsername(user.username || "");
      setLoading(false);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedProfile = {
        username,
        email,
        profile: {
          firstName,
          lastName,
          phone,
          address,
        },
      };
      const response = await axios.put(
        `${API_BASE_URL}/users/${user.id}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("User updated successfully:", response.data);
        setUser({
          ...user,
          username,
          email,
          profile: {
            firstName,
            lastName,
            phone,
            address,
          },
        });
        alert("Profile updated successfully!");
      } else {
        console.error("User update failed:", response.status, response.data);
        alert("Profile update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating profile. Please check console for details.");
    }
  };

  const handleRequestSeller = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/users/${user.id}`,
        { role: "seller" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Seller request sent successfully");
        setIsSellerRequestSent(true);
        setUser({ ...user, role: "seller" });
        alert("You are now a seller");
      } else {
        console.error("Seller request failed:", response.status, response.data);
        alert("Seller request failed. Please try again.");
      }
    } catch (error) {
      console.error("Error sending seller request:", error);
      alert("Error sending seller request. Please check console for details.");
    }
  };

  if (loading) {
    return "Loading the data please wait…";
  }

  return (
    <div className="container mx-auto p-6 mt-8" dir="rtl">
      <h2 className="text-2xl font-bold mb-4">پروفایل من</h2>
      {user ? (
        <div className="bg-white rounded-md shadow-lg p-6">
          <form onSubmit={handleSubmit}>
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

          {!isSellerRequestSent && user.role !== "seller" && (
            <button
              onClick={handleRequestSeller}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Become a Seller
            </button>
          )}

          <button
            className="text-blue-500 hover:underline mt-4"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      ) : (
        "Loading the data please wait…"
      )}
    </div>
  );
};

export default UserProfile;
