import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const categories = [
  {
    name: "Mobiles",
    icon: "📱",
    subcategories: ["Apple", "Samsung", "Xiaomi", "Oppo", "Google"],
  },
  {
    name: "Home & Appliances",
    icon: "🏠",
    subcategories: ["Kitchen Appliances", "Home Appliances", "Furniture"],
  },
  {
    name: "Beauty & Health",
    icon: "💄",
    subcategories: ["Skincare", "Makeup", "Haircare", "Personal Care"],
  },
  {
    name: "Automotive & Transport",
    icon: "🚗",
    subcategories: ["Car Accessories", "Motorcycle Parts", "Bicycle Parts"],
  },
  {
    name: "Digital Goods",
    icon: "💻",
    subcategories: ["Software", "Games", "Digital Content"],
  },
  {
    name: "Fashion",
    icon: "👚",
    subcategories: ["Men's Clothing", "Women's Clothing", "Kids Fashion"],
  },
];

const NavigationSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  return (
    <aside
      className={`bg-gray-50 w-64 p-4 shadow-md fixed top-0 left-0 h-full overflow-y-auto transform transition-transform duration-300 lg:relative ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }  lg:translate-x-0 z-10`}
    >
      <div className="flex justify-end lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-gray-500 px-2 py-1 rounded-md hover:bg-gray-300"
        >
          X
        </button>
      </div>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category.name} className="hover:bg-gray-200 p-2 rounded-md">
            <div className="flex items-center cursor-pointer">
              <span className="mr-2">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </div>
            {/* Subcategories */}
            {category.subcategories && category.subcategories.length > 0 && (
              <ul className="ml-4 mt-2 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li
                    key={subcategory}
                    className="hover:bg-gray-200 p-1 rounded-md"
                  >
                    <span className="text-gray-700">{subcategory}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NavigationSidebar;
