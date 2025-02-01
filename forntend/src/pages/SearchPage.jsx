// frontend/src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/api";

const SearchPage = () => {
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const persianNumber = (number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(number).replace(/\d/g, (d) => persianDigits[d]);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const filteredProducts = allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  if (loading) {
    return <div className="text-center text-gray-500">در حال بارگذاری...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">خطا: {error}</div>;
  }
  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">
        {" "}
        نتایج جستجو برای "{searchTerm}"
      </h1>
      {products.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-md shadow-md p-4 w-64 flex-shrink-0"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="mb-2 w-full h-40 object-cover rounded-md"
              />
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm">
                {persianNumber(product.price)} افغانی
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>محصولی برای "{searchTerm}" یافت نشد </p>
      )}
    </div>
  );
};

export default SearchPage;
