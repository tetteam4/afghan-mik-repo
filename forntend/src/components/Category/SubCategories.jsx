import React from "react";

const SubCategories = ({ hoveredCategory }) => {
  return (
    <div className="bg-gray-50 h-full overflow-y-scroll p-4 shadow-lg">
      <h4 className="text-lg font-semibold pt-3">{hoveredCategory.name}</h4>
      <ul className="text-sm text-gray-600">
        {hoveredCategory.subcategories.map((sub, index) => (
          <li
            key={index}
            className="hover:bg-gray-300 py-2 px-3 rounded-md cursor-pointer"
          >
            {sub}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategories;
