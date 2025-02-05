// frontend/src/pages/ManageProducts.jsx

import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Filter products to show only the seller's products
          const sellerProducts = response.data.filter(
            (product) => product.seller === user.id
          );
          setProducts(sellerProducts);
        } else {
          console.error(
            "Failed to fetch products:",
            response.status,
            response.data
          );
          alert("Failed to fetch products. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please check the console for details.");
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchProducts();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-md shadow-md p-4"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>Price: {product.price}</p>
              {/* Add edit and delete buttons here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ManageProducts;
