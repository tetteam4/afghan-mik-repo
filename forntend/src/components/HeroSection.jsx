// frontend/src/components/HeroSection.jsx
import React, { useState, useEffect, useRef } from "react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: "/on/3bc36b2d17fdd8f6a2e13fee6341944969e0d117_1737790689.webp",
      title: "Slider One",
      description: "Some description for slide 1",
    },
    {
      id: 2,
      image: "/on/071aae4cfac33369f522205f03f4801fae2e2c84_1737898557.gif",
      title: "Slider One",
      title: "Slider Two",
      description: "Some description for slide 2",
    },
    {
      id: 3,
      image: "/on/77b9f821314e777bc92418adc2bb0d8dd6db2400_1737882290.gif",
      title: "Slider One",
      title: "Slider Three",
      description: "Some description for slide 3",
    },
    {
      id: 4,
      image: "/on/c37f3ab10439601a13e20acd9307eefd907ce253_1737966015.gif",
      title: "Slider One",
      title: "Slider Three",
      description: "Some description for slide 3",
    },
    {
      id: 5,
      image: "/on/cec5045371bda5c77bfa49f84ab22c65aca1054d_1737373650.webp",
      title: "Slider One",
      title: "Slider Three",
      description: "Some description for slide 3",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };
  useEffect(() => {
    const sliderInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-md shadow-md ">
      {/* Slider content */}
      <div ref={sliderRef} className=" relative w-full h-96">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentSlide
                ? "translate-x-0 opacity-100"
                : index > currentSlide
                ? "translate-x-full opacity-0"
                : "-translate-x-full opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Slider Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={prevSlide}
          className="bg-gray-700 text-white rounded-full w-8 h-8 flex justify-center items-center"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="bg-gray-700 text-white rounded-full w-8 h-8 flex justify-center items-center"
        >
          ›
        </button>
      </div>
    </div>
  );
};
export default HeroSection;
