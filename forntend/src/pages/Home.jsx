import React from "react";
import HeroSection from "../components/HeroSection";
import VideoHistory from "../components/VideoHistory";

const Home = () => {
  return (
    <div className="container min-h-screen mx-auto mt-6 text-center">
      <p className="mt-4 text-gray-600">Hi History of Users</p>
      <div>
         <VideoHistory />
      </div>
         <HeroSection />
    </div>
  );
};

export default Home;
