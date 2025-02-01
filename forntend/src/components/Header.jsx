// frontend/src/components/Header.jsx
import React, { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import CitySelector from "./CitySelector";
import SearchPopup from "./SearchPopup";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { isSearchOpen, setIsSearchOpen, isSidebarOpen, setIsSidebarOpen } =
    useContext(AppContext);
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
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
  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
      setSearchResults([]);
    }
  };
  const searchRef = useRef(null);

  const suggestions = [
    "ساعت هوشمند",
    "گوشی موبایل",
    "لپ تاپ",
    "هدفون",
    "کیف",
    "کتاب",
    "لوازم منزل",
  ];
  useEffect(() => {
    if (searchRef.current) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchTerm]);
  return (
    <header className="bg-white shadow-md z-30">
      <div
        className="container mx-auto px-4 py-2 flex items-center justify-between relative"
        dir="rtl"
      >
        {/* Category Toggle */}
        <button
          onClick={handleToggleSidebar}
          className="text-gray-700 focus:outline-none lg:hidden"
        >
          ☰
        </button>
        {/* Logo */}
        <div className="text-2xl font-bold text-red-500 font-serif">
          <span className="text-gray-800">بازار</span> افغان
        </div>
        {/* search bar */}
        <div className="relative flex-grow mx-4 hidden lg:block">
          <input
            type="text"
            placeholder="جستجو در محصولات"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
            onKeyDown={handleSearch}
            ref={searchRef}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && searchResults.length > 0 && (
            <ul className="absolute top-12 right-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="p-2 px-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate(`/search/${result}`);
                    setSearchTerm("");
                    setSearchResults([]);
                  }}
                >
                  {result}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleSearchClick}
            className="absolute top-0 left-0 h-full w-10 flex justify-center items-center text-gray-500 hover:text-gray-700"
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
              انتخاب شهر
            </div>
            {isCitySelectorOpen && (
              <CitySelector onClose={handleCloseCitySelector} />
            )}
          </div>
          {/* login / profile */}
          <div className="relative">
            <div
              onClick={toggleProfileOptions}
              className="cursor-pointer text-gray-800 hover:text-gray-600"
            >
              پروفایل
            </div>
            {showProfileOptions && (
              <div className="absolute bg-white border border-gray-300 rounded-md shadow-md p-2 top-8 right-0 w-48 z-20">
                <ul className="space-y-1">
                  <li className="hover:bg-gray-100 py-1 px-2 rounded-md cursor-pointer">
                    ورود
                  </li>
                  <li className="hover:bg-gray-100 py-1 px-2 rounded-md cursor-pointer">
                    پروفایل من
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* cart */}
          <div className="relative">
            <div className="cursor-pointer text-gray-800 hover:text-gray-600">
              🛒
            </div>
            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-1 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
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
