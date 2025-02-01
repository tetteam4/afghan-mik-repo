import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const categories = [
  {
    name: "موبایل",
    icon: "📱",
    subcategories: ["اپل", "سامسونگ", "شیائومی", "اوپو", "گوگل"],
  },
  {
    name: "خانه و لوازم خانگی",
    icon: "🏠",
    subcategories: ["لوازم آشپزخانه", "لوازم خانگی", "مبلمان"],
  },
  {
    name: "آرایشی و بهداشتی",
    icon: "💄",
    subcategories: ["مراقبت از پوست", "آرایش", "مراقبت مو", "مراقبت شخصی"],
  },
  {
    name: "خودرو و حمل و نقل",
    icon: "🚗",
    subcategories: ["لوازم جانبی خودرو", "قطعات موتور سیکلت", "قطعات دوچرخه"],
  },
  {
    name: "کالاهای دیجیتال",
    icon: "💻",
    subcategories: ["نرم افزار", "بازی ها", "محتوای دیجیتال"],
  },
  {
    name: "مد و پوشاک",
    icon: "👚",
    subcategories: ["لباس مردانه", "لباس زنانه", "مد کودکان"],
  },
];

const NavigationSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };
  return (
    <aside
      className={`bg-gray-50 w-64 p-4 shadow-md fixed top-0 right-0 h-full overflow-y-auto transform transition-transform duration-300 lg:relative ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }  lg:translate-x-0 z-10`}
      dir="rtl"
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
        {categories.map((category, index) => (
          <li key={category.name} className="hover:bg-gray-200 p-2 rounded-md">
            <div
              onClick={() => toggleSubMenu(index)}
              className="flex items-center cursor-pointer justify-between"
            >
              <div className="flex items-center">
                <span className="mr-2">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              {category.subcategories && category.subcategories.length > 0 && (
                <span
                  className={`transform transition-transform duration-200  ${
                    openSubMenu === index ? "rotate-90" : ""
                  }`}
                >
                  ◀
                </span>
              )}
            </div>
            {/* Subcategories */}
            {category.subcategories && category.subcategories.length > 0 && (
              <ul
                className={`ml-4 mt-2 space-y-1 transition-all duration-300 overflow-hidden ${
                  openSubMenu === index
                    ? "max-h-96 p-2 border-r border-gray-300"
                    : "max-h-0"
                }`}
              >
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
