// frontend/src/components/CategoryCard.jsx
import React from "react";
import { Link } from "react-router-dom";
const products = [
  {
    id: 1,
    name: "محصول 1",
    price: "1000",
    image: "https://placekitten.com/200/300",
    rating: 4,
    description: "توضیحات محصول",
  },
  {
    id: 2,
    name: "محصول 2",
    price: "2000",
    image: "https://placekitten.com/200/301",
    rating: 3,
    description: "توضیحات محصول",
  },
  {
    id: 3,
    name: "محصول 3",
    price: "3000",
    image: "https://placekitten.com/200/302",
    rating: 5,
    description: "توضیحات محصول",
  },
  {
    id: 4,
    name: "محصول 4",
    price: "4000",
    image: "https://placekitten.com/200/303",
    rating: 2,
    description: "توضیحات محصول",
  },
  {
    id: 5,
    name: "محصول 5",
    price: "5000",
    image: "https://placekitten.com/200/304",
    rating: 3.5,
    description: "توضیحات محصول",
  },
  {
    id: 6,
    name: "محصول 6",
    price: "6000",
    image: "https://placekitten.com/200/305",
    rating: 4.5,
    description: "توضیحات محصول",
  },
  {
    id: 7,
    name: "محصول 7",
    price: "7000",
    image: "https://placekitten.com/200/306",
    rating: 5,
    description: "توضیحات محصول",
  },
  {
    id: 8,
    name: "محصول 8",
    price: "8000",
    image: "https://placekitten.com/200/307",
    rating: 2.5,
    description: "توضیحات محصول",
  },
  {
    id: 9,
    name: "محصول 9",
    price: "9000",
    image: "https://placekitten.com/200/308",
    rating: 3,
    description: "توضیحات محصول",
  },
  {
    id: 10,
    name: "محصول 10",
    price: "10000",
    image: "https://placekitten.com/200/309",
    rating: 4,
    description: "توضیحات محصول",
  },
];
const CategoryCard = ({ title }) => {
  const [showQuickView, setShowQuickView] = React.useState(null);

  const handleQuickView = (productId) => {
    setShowQuickView(productId);
  };
  const handleCloseQuickView = () => {
    setShowQuickView(null);
  };
  const persianNumber = (number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(number).replace(/\d/g, (d) => persianDigits[d]);
  };
  return (
    <div className="mt-8" dir="rtl">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-md shadow-md p-4 w-64 flex-shrink-0 relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-2 w-full h-40 object-cover rounded-md"
            />
            <h3 className="font-medium text-gray-800">{product.name}</h3>
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm">
                {persianNumber(product.price)} افغانی
              </p>
              <span className="text-yellow-500">
                {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
                  <span key={i}>★</span>
                ))}
                {product.rating % 1 !== 0 && <span>½</span>}
              </span>
            </div>
            <button
              onClick={() => handleQuickView(product.id)}
              className="absolute bottom-2 left-2 bg-blue-100 text-blue-500 px-2 py-1 text-xs rounded-md hover:bg-blue-200"
            >
              مشاهده سریع
            </button>
            {showQuickView === product.id && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div
                  className="bg-white rounded-md shadow-lg p-6 relative"
                  dir="rtl"
                >
                  <div className="flex justify-end">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleCloseQuickView}
                    >
                      X
                    </button>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-2 w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="font-medium text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">
                      {persianNumber(product.price)} افغانی
                    </p>
                    <span className="text-yellow-500">
                      {Array.from(
                        { length: Math.floor(product.rating) },
                        (_, i) => (
                          <span key={i}>★</span>
                        )
                      )}
                      {product.rating % 1 !== 0 && <span>½</span>}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryCard;
