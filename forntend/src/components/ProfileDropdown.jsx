// frontend/src/components/ProfileDropdown.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ user, logout, onClose }) => {
  return (
    <div className="absolute bg-white border border-gray-300 rounded-md shadow-md p-2 top-8 right-0 w-48 z-20">
      <ul className="space-y-1">
        {user ? (
          <>
            <li className="hover:bg-gray-100 py-1 px-2 rounded-md cursor-pointer">
              <Link to="/dashboard" onClick={onClose}>
                داشبورد
              </Link>
            </li>
            <li
              className="hover:bg-gray-100 py-1 px-2 rounded-md cursor-pointer"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              خروج
            </li>
          </>
        ) : (
          <>
            <li className="hover:bg-gray-100 py-1 px-2 rounded-md cursor-pointer">
              <Link to="/signin" onClick={onClose}>
                ورود
              </Link>
            </li>
            <li className="hover:bg-gray-100 py-1 px-2 rounded-md cursor-pointer">
              <Link to="/signup" onClick={onClose}>
                ثبت نام
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default ProfileDropdown;
