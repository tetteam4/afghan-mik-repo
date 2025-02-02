import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$20",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$30",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$25",
    image: "https://via.placeholder.com/150",
  },
];

const Shop = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Shop;
