// frontend/src/Layout/UserLayout.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Header from "../components/Navbar/Header";

const UserLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      <Header />
      <div className="container mx-auto px-4 flex mt-24 flex-1">
        <Outlet />
      </div>
    </div>
  );
};
export default UserLayout;
