// frontend/src/components/AddToCart.jsx
import React, { useState, useContext } from "react";
import { useAuthStore } from "../../store/authStore";
const AddToCart = ({ product }) => {
  const { addToCart, cart } = useAuthStore(); // Assuming you add these to the store

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center mt-4">
      <div className="flex items-center border border-gray-300 rounded-md">
        <button
          onClick={decreaseQuantity}
          className="px-3 py-2 hover:bg-gray-100"
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="px-3 py-2 hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-2 px-4 rounded-md ml-4 hover:bg-blue-700"
      >
        افزودن به سبد خرید
      </button>
    </div>
  );
};

export default AddToCart;
