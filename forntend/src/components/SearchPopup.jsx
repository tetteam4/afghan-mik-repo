// frontend/src/components/SearchPopup.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
const SearchPopup = () => {
  const { setIsSearchOpen } = useContext(AppContext);
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg p-6">
        <div className="flex justify-end">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleCloseSearch}
          >
            X
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative w-80 h-80 border border-gray-300 flex justify-center items-center">
            <span className="text-gray-300">No Results Found</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchPopup;
