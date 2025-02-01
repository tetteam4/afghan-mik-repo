//frontend/src/components/CitySelector.jsx
import React from "react";

const cities = [
  "Kabul",
  "Herat",
  "Kandahar",
  "Mazar-i-Sharif",
  "Jalalabad",
  "Kunduz",
  "Ghazni",
  "Baghlan",
  "Lashkar Gah",
  "Farah",
];
const CitySelector = ({ onClose }) => {
  return (
    <div className="absolute bg-white border border-gray-300 rounded-md shadow-md p-2 top-8 right-0 w-48 z-20">
      <ul className="space-y-1">
        {cities.map((city, index) => (
          <li
            key={index}
            className="hover:bg-gray-100 py-1 px-2 rounded-md cursor-pointer"
            onClick={onClose}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySelector;
