// frontend/src/components/VideoComponents/VideoContent.jsx
import React, { useState } from "react";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaMusic,
  FaPlus,
  FaPause,
  FaPlay,
} from "react-icons/fa";

const VideoContent = ({ story }) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div className="relative">
      <video
        src={story.videoUrl}
        loop
        muted
        autoPlay
        className="w-full h-full object-cover rounded-3xl"
      />
      <div className="absolute bottom-0 left-0 p-4 flex flex-col justify-end h-full">
        <div className="flex items-center mb-2">
          <img
            src={story.userImg}
            alt=""
            className="w-8 h-8 rounded-full mr-3"
          />
          <h3 className="text-sm font-semibold text-white">{story.userName}</h3>
        </div>
        <p className="text-xs text-white mb-4">{story.description}</p>
        <div className="flex gap-4">
          <button className="text-sm text-white">
            <FaHeart />
          </button>
          <button className="text-sm text-white">
            <FaComment />
          </button>
          <button className="text-sm text-white">
            <FaShare />
          </button>
          <button className="text-sm text-white">
            <FaMusic />
          </button>
          <button className="text-sm text-white">
            <FaPlus />
          </button>
        </div>
      </div>
      <button className="absolute top-1/2 left-1/2 text-white text-6xl">
        <FaPause />
        <FaPlay />
      </button>
    </div>
  );
};

export default VideoContent;
