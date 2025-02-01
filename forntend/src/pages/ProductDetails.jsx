// frontend/src/pages/ProductDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "1000 AFN",
      image: "https://placekitten.com/200/300",
      description: "This is product 1 with a short description.",
    },
    {
      id: 2,
      name: "Product 2",
      price: "2000 AFN",
      image: "https://placekitten.com/200/301",
      description: "This is product 2 with a short description.",
    },
    {
      id: 3,
      name: "Product 3",
      price: "3000 AFN",
      image: "https://placekitten.com/200/302",
      description: "This is product 3 with a short description.",
    },
    {
      id: 4,
      name: "Product 4",
      price: "4000 AFN",
      image: "https://placekitten.com/200/303",
      description: "This is product 4 with a short description.",
    },
    {
      id: 5,
      name: "Product 5",
      price: "5000 AFN",
      image: "https://placekitten.com/200/304",
      description: "This is product 5 with a short description.",
    },
    {
      id: 6,
      name: "Product 6",
      price: "6000 AFN",
      image: "https://placekitten.com/200/305",
      description: "This is product 6 with a short description.",
    },
  ];
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-md lg:w-1/2"
        />
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">Price: {product.price}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
