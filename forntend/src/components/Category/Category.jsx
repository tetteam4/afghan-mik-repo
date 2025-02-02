// frontend/src/components/Category/Category.jsx
import React, { useState, useEffect } from "react";
import MainCategory from "./MainCategory";
import SubCategories from "./SubCategories";

const Category = () => {
  const categories = [
    {
      name: "مد و پوشاک مردانه",
      subcategories: [
        "پیراهن",
        "شلوار",
        "کفش",
        "لوازم جانبی",
        "پیراهن",
        "شلوار",
        "کفش",
        "لوازم جانبی",
        "پیراهن",
        "شلوار",
        "کفش",
        "لوازم جانبی",
        "پیراهن",
        "شلوار",
        "کفش",
        "لوازم جانبی",
        "پیراهن",
        "شلوار",
        "کفش",
        "لوازم جانبی",
      ],
    },
    {
      name: "مد و پوشاک زنانه",
      subcategories: ["لباس", "تاپ", "دامن", "کیف دستی"],
    },
    {
      name: "مد و پوشاک بچگانه",
      subcategories: [
        "تی‌شرت",
        "شلوارک",
        "کفش ورزشی",
        "کلاه",
        "پیراهن",
        "شلوار",
        "کفش",
        "لوازم جانبی",
      ],
    },
    {
      name: "لوازم جانبی",
      subcategories: ["ساعت", "جواهرات", "کمربند", "عینک آفتابی"],
    },
    {
      name: "کتاب و لوازم تحریر",
      subcategories: ["کتاب‌های آموزشی", "دفتر", "مداد", "پاک‌کن"],
    },
    {
      name: "لوازم خانه",
      subcategories: ["مبلمان", "چراغ", "دکوراسیون", "فرش"],
    },
    {
      name: "الکترونیک و فناوری",
      subcategories: ["گوشی موبایل", "لپ‌تاپ", "دوربین", "هدست"],
    },
    {
      name: "ورزش و تناسب اندام",
      subcategories: [
        "لباس ورزشی",
        "کفش ورزشی",
        "دستگاه‌های ورزشی",
        "دستکش ورزشی",
      ],
    },
    {
      name: "عطر و لوازم آرایشی",
      subcategories: ["عطر", "کرم صورت", "لوازم آرایش", "شامپو"],
    },
    {
      name: "مد و پوشاک مردانه",
      subcategories: ["پیراهن", "شلوار", "کفش", "لوازم جانبی"],
    },
    {
      name: "مد و پوشاک زنانه",
      subcategories: ["لباس", "تاپ", "دامن", "کیف دستی"],
    },
    {
      name: "مد و پوشاک بچگانه",
      subcategories: [
        "تی‌شرت",
        "شلوارک",
        "کفش ورزشی",
        "کلاه",
        "پیراهن",
        "شلوار",
        "کفش",
        "لوازم جانبی",
      ],
    },
    {
      name: "لوازم جانبی",
      subcategories: ["ساعت", "جواهرات", "کمربند", "عینک آفتابی"],
    },
    {
      name: "کتاب و لوازم تحریر",
      subcategories: ["کتاب‌های آموزشی", "دفتر", "مداد", "پاک‌کن"],
    },
    {
      name: "لوازم خانه",
      subcategories: ["مبلمان", "چراغ", "دکوراسیون", "فرش"],
    },
    {
      name: "الکترونیک و فناوری",
      subcategories: ["گوشی موبایل", "لپ‌تاپ", "دوربین", "هدست"],
    },
    {
      name: "ورزش و تناسب اندام",
      subcategories: [
        "لباس ورزشی",
        "کفش ورزشی",
        "دستگاه‌های ورزشی",
        "دستکش ورزشی",
      ],
    },
  ];

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  let hoverTimeout;

  const handleMouseEnter = (category) => {
    clearTimeout(hoverTimeout);
    setHoveredCategory(category);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setHoveredCategory(null);
      setIsHovered(false);
    }, 300);
  };

  useEffect(() => {
    return () => clearTimeout(hoverTimeout);
  }, []);

  return (
    <div
      className="flex gap-x-5 h-[500px] max-h-full"
      onMouseEnter={() => clearTimeout(hoverTimeout)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Categories */}
      <div className="w-[25%] h-full bg-white">
        <MainCategory
          categories={categories}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Subcategories */}
      <div className="w-[75%] h-full">
        {isHovered && hoveredCategory && (
          <SubCategories hoveredCategory={hoveredCategory} />
        )}
      </div>
    </div>
  );
};

export default Category;
