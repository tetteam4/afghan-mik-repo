import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { FaMale, FaFemale, FaChild } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import Category from "../Category/Category";
// import Backdrop from "../BackDrop"; // Import Backdrop component

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null); // Tracks the active mega menu

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Detect scroll to toggle navbar position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  useEffect(() => {
    let timeout;
    if (isHovered) {
      timeout = setTimeout(() => setShowCategory(true), 300); // 300ms delay
    } else {
      timeout = setTimeout(() => setShowCategory(false), 300); // 300ms delay
    }

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [isHovered]);

 
  const navItems = [
    { to: "/men", label: "مد فشن مردانه", icon: <FaMale /> },
    { to: "/women", label: "مد فشن زنانه", icon: <FaFemale /> },
    { to: "/kids", label: "مد فشن کودکانه", icon: <FaChild /> },
    { to: "/accessories", label: "لوازم جانبی", icon: <FaChild /> },
    { to: "/footwear", label: "کفش", icon: <FaChild /> },
    { to: "/new-arrivals", label: "جدیدترین‌ها", icon: <FaChild /> },
    { to: "/sale", label: "حراج", icon: <FaChild /> },
  ];

  return (
    <nav
      className={`w-full z-30 transition-all    border-b-2 duration-500 ${
        isScrolled
          ? "sticky top-20 bg-white  border-b-2 border-gray-800 shadow-md"
          : "fixed top-20 bg-transparent"
      }`}
    >
      <div className="container relative mx-auto px-4 py-2 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none text-3xl">
            {menuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`absolute lg:static -top-2 left-0 w lg:w-auto lg:flex lg:bg-transparent lg:translate-x-0 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 lg:items-center`}
        >
        
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex group relative items-center border-l-2 border-gray-400 ml-5 pl-5 font-semibold gap-x-2 cursor-pointer text-gray-780">
              <span>
                <TfiMenuAlt size={18} />
              </span>
              <p>دسته‌بندی کالاها</p>
              <span className="absolute -bottom-2 right-0 h-0.5 rounded-lg w-0 bg-red-700 transition-all duration-300 group-hover:w-full"></span>
            </div>

            {/* Categories Component */}
            {showCategory && (
              <>
                <div
                  className="absolute top-8 border-gray-200 rounded-md right-0 w-[1000px]  bg-gray-100 h-[500px] border z-50"
                  style={{
                    direction: "ltr",
                  }}
                >
                  <div
                    style={{
                      direction: "rtl",
                    }}
                  >
                    <Category />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Navbar Items */}
          <div
            className={`absolute lg:static -top-2 left-0  right-0 lg:flex lg:bg-transparent lg:translate-x-0 transform ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 lg:items-center`}
          >
            <ul className="lg:flex lg:gap-8 lg:p-0 space-y-4 lg:space-y-0 relative">
              {navItems.map((item, index) => (
                <li
                  key={item.to}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(index)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.to}
                    className="text-gray-600 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span>{item.label}</span>
                  </Link>

                  {/* Mega Menu */}
                  {activeMenu === index && (
                    <div className="absolute top-full left-0 w-full bg-gray-100 shadow-lg rounded-md p-6 z-50">
                      <h3 className="font-bold text-lg mb-4">
                        Explore {item.label}
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Category 1</h4>
                          <ul>
                            <li>
                              <Link
                                to="#"
                                className="text-sm hover:text-blue-500"
                              >
                                Sub-item 1
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="text-sm hover:text-blue-500"
                              >
                                Sub-item 2
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Category 2</h4>
                          <ul>
                            <li>
                              <Link
                                to="#"
                                className="text-sm hover:text-blue-500"
                              >
                                Sub-item 3
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="text-sm hover:text-blue-500"
                              >
                                Sub-item 4
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Category 3</h4>
                          <ul>
                            <li>
                              <Link
                                to="#"
                                className="text-sm hover:text-blue-500"
                              >
                                Sub-item 5
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="text-sm hover:text-blue-500"
                              >
                                Sub-item 6
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
