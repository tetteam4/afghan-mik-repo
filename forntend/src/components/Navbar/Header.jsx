import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TfiShoppingCart } from "react-icons/tfi";
import { GoSignIn } from "react-icons/go";
import { TbLogin } from "react-icons/tb";
import { Link } from "react-router-dom";
import CitySelector from "../CitySelector";

const Header = () => {
  const [isClick, setIsClick] = useState(false);
  const [cardItems, setCardItems] = useState(0);
 const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);


    const handleCitySelector = () => {
      setIsCitySelectorOpen(!isCitySelectorOpen);
    };
    const handleCloseCitySelector = () => {
      setIsCitySelectorOpen(false);
    };
  return (
    <header className="bg-white fixed z-40 p-6 top-0 left-0 right-0">
      <div className="container mx-auto grid grid-cols-2">
        {/* Logo */}
        <div className="flex items-center gap-x-4  justify-between">
          <div className="text-2xl font-bold text-red-500 font-serif">
            <a href="/" className="text-gray-800">بازار</a> افغان
          </div>
          {/* Search Bar */}
          <div className="flex-1 mx-4 relative">
            <input
              type="text"
              onClick={() => setIsClick(!isClick)}
              placeholder="جستجو ..."
              className="w-full py-2 border px-10 border-gray-300 bg-gray-200 rounded-lg focus:outline-none "
            />
            <span
              className={`absolute top-3 text-xl  text-gray-500 right-4  ${
                isClick ? "hidden" : ""
              }`}
            >
              <IoSearch />
            </span>
            {isClick && (
              <div className="absolute top-12 right-0 w-full h-[300px] bg-gray-100 border border-gray-600 rounded-lg"></div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-5">
          <div className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-lg border p-2 ">
            <span>
              <TbLogin className="text-gray-700" size={24} />
            </span>
            <Link
              to="/signup
            "
              className="px-2  text-sm font-semibold "
            >
              ورود
            </Link>
            <Link
              to="/signin"
              className="px-2 border-r-2 border-black text-sm font-semibold "
            >
              ثبت نام
            </Link>
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
          </div>

          <div className="relative ml-4">
            <Link
              to="/card"
              className="text-gray-600 hover:text-blue-500 focus:outline-none"
            >
              <TfiShoppingCart size={30} />
            </Link>
            {cardItems > 0 && (
              <span className="absolute -top-2 -right-2 px-1.5 flex items-center justify-center py-0.5 text-xs text-white bg-red-500 rounded-full">
                3
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
