// frontend/src/components/CategoryCard.jsx
import React from "react";
import { Link } from "react-router-dom";
const CategoryCard = ({ title, products }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto gap-4">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white rounded-md shadow-md p-4 w-64 flex-shrink-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-2 w-full h-40 object-cover rounded-md"
            />
            <h3 className="font-medium text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default CategoryCard;
