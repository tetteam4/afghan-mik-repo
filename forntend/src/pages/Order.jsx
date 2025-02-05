//frontend/src/pages/Order.jsx
import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000/api";

const Order = () => {
  const { user, cart, clearCart } = useAuthStore();
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit card"); // Default
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setOrderTotal(total);
  }, [cart]);

  const handleAddressChange = (e, addressType) => {
    const { name, value } = e.target;
    if (addressType === "shipping") {
      setShippingAddress({ ...shippingAddress, [name]: value });
    } else if (addressType === "billing") {
      setBillingAddress({ ...billingAddress, [name]: value });
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      userId: user.id,
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: orderTotal,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      paymentMethod: paymentMethod,
    };

    try {
      const token = localStorage.getItem("token"); //Or from cookies
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`, //or Bearer token
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("Order created successfully:", response.data);
        clearCart();
        alert("Order placed successfully!");
        navigate("/"); // Or a dedicated order confirmation page
      } else {
        console.error("Order creation failed:", response.status, response.data);
        alert("Order creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error placing order. Please check console for details.");
    }
  };
  if (!user) {
    return null;
  }
  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">تکمیل سفارش</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-2">آدرس ارسال</h2>
        <div className="mb-4">
          <label
            htmlFor="street"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            خیابان
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={shippingAddress.street}
            onChange={(e) => handleAddressChange(e, "shipping")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            شهر
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.city}
            onChange={(e) => handleAddressChange(e, "shipping")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            استان
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={shippingAddress.state}
            onChange={(e) => handleAddressChange(e, "shipping")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="zipCode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            کد پستی
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={shippingAddress.zipCode}
            onChange={(e) => handleAddressChange(e, "shipping")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            کشور
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingAddress.country}
            onChange={(e) => handleAddressChange(e, "shipping")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mb-2">آدرس پرداخت</h2>
        <div className="mb-4">
          <label
            htmlFor="billingStreet"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            خیابان
          </label>
          <input
            type="text"
            id="billingStreet"
            name="street"
            value={billingAddress.street}
            onChange={(e) => handleAddressChange(e, "billing")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="billingCity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            شهر
          </label>
          <input
            type="text"
            id="billingCity"
            name="city"
            value={billingAddress.city}
            onChange={(e) => handleAddressChange(e, "billing")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="billingState"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            استان
          </label>
          <input
            type="text"
            id="billingState"
            name="state"
            value={billingAddress.state}
            onChange={(e) => handleAddressChange(e, "billing")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="billingZipCode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            کد پستی
          </label>
          <input
            type="text"
            id="billingZipCode"
            name="zipCode"
            value={billingAddress.zipCode}
            onChange={(e) => handleAddressChange(e, "billing")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="billingCountry"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            کشور
          </label>
          <input
            type="text"
            id="billingCountry"
            name="country"
            value={billingAddress.country}
            onChange={(e) => handleAddressChange(e, "billing")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">روش پرداخت</h2>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="paymentMethod"
              value="credit card"
              checked={paymentMethod === "credit card"}
              onChange={handlePaymentMethodChange}
            />
            <span className="ml-2">کارت اعتباری</span>
          </label>
          <label className="inline-flex items-center mr-6">
            <input
              type="radio"
              className="form-radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
            />
            <span className="ml-2">پی پال</span>
          </label>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">مجموع سفارش: {orderTotal} افغانی</p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          ثبت سفارش
        </button>
      </form>
    </div>
  );
};

export default Order;
