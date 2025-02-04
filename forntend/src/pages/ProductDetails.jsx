// frontend/src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";
import { useAuthStore } from "../store/authStore";

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getProductById, product } = useAuthStore();

  const persianNumber = (number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(number).replace(/\d/g, (d) => persianDigits[d]);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">در حال بارگذاری...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">خطا: {error}</div>;
  }
  if (!product) {
    return <div>محصولی یافت نشد</div>;
  }

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-96 object-cover rounded-md lg:w-1/2"
        />
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">
            قیمت: {persianNumber(product.price)} افغانی
          </p>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
