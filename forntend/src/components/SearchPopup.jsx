// frontend/src/components/SearchPopup.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
const SearchPopup = () => {
  const { setIsSearchOpen } = useContext(AppContext);
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };
  const recentSearches = [
    "موبایل سامسونگ",
    "لپ تاپ",
    "هدفون بلوتوثی",
    "ساعت هوشمند",
    "کیف چرم زنانه",
  ];
  const trendingSearches = [
    "کفش مردانه",
    "عطر زنانه",
    "کتاب داستان",
    "لوازم ورزشی",
  ];
  return (
    <div
      dir="rtl"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-md shadow-lg p-6 relative">
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <span className="font-bold">جستجو</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleCloseSearch}
          >
            X
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-80  flex flex-col ">
            {/* Recent Searches */}
            <div className="my-4">
              <h3 className="text-gray-700 font-bold text-right">
                جستجوهای اخیر
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {recentSearches.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {/* Trending Searches */}
            <div className="my-4">
              <h3 className="text-gray-700 font-bold text-right">
                جستجوهای پرطرفدار
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {trendingSearches.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchPopup;
