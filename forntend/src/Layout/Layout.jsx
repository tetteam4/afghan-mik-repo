import React from "react";
// import Header from "../components/Navbar/Header";
import { Outlet } from "react-router-dom";
import Header from "../components/Navbar/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer"
const Layout = () => {
  return (
    <div className="">
      <div className="border  border-black">
        <Header />
        <Navbar />
      </div>
      <div className="mt-36">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
