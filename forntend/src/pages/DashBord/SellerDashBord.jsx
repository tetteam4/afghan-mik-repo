// frontend/src/pages/DashBord/SellerDashBord.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

function SellerDashBord() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user || user.role !== "seller") {
    navigate("/");
    return null;
  }
  return (
    <div>
      <h2>Seller Dashboard</h2>
      {/* Add links to manage products, view orders, etc. */}
      <Link to="/seller-dash/manage-products">Manage Products</Link>
      <Link to="/seller-dash/add-products">Add Products</Link>
    </div>
  );
}

export default SellerDashBord;
