// frontend/src/components/Header.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import CitySelector from "./CitySelector";
import SearchPopup from "./SearchPopup";
const Header = () => {
  const { isSearchOpen, setIsSearchOpen, isSidebarOpen, setIsSidebarOpen } =
    useContext(AppContext);
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleCitySelector = () => {
    setIsCitySelectorOpen(!isCitySelectorOpen);
  };
  const handleCloseCitySelector = () => {
    setIsCitySelectorOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between relative">
        {/* Category Toggle */}
        <button
          onClick={handleToggleSidebar}
          className="text-gray-700 focus:outline-none lg:hidden"
        >
          ☰
        </button>
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">AfghanMarket</div>
        {/* search bar */}
        <div className="relative flex-grow mx-4 hidden lg:block">
          <input
            type="text"
            placeholder="Search products"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearchClick}
            className="absolute top-0 right-0 h-full w-10 flex justify-center items-center text-gray-500 hover:text-gray-700"
          >
            🔍
          </button>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* city select */}
          <div className="relative">
            <div
              onClick={handleCitySelector}
              className="cursor-pointer text-gray-800 hover:text-gray-600"
            >
              city select
            </div>
            {isCitySelectorOpen && (
              <CitySelector onClose={handleCloseCitySelector} />
            )}
          </div>
          {/* login / profile */}
          <div className="cursor-pointer text-gray-800 hover:text-gray-600">
            Login
          </div>
          {/* cart */}
          <div className="cursor-pointer text-gray-800 hover:text-gray-600">
            🛒
          </div>
        </div>
        {/* Mobile Search Bar */}
        <div className="relative flex-grow mx-4 lg:hidden">
          <button
            onClick={handleSearchClick}
            className="flex justify-center items-center text-gray-500 hover:text-gray-700"
          >
            🔍
          </button>
        </div>
        {isSearchOpen && <SearchPopup />}
      </div>
    </header>
  );
};
export default Header;
