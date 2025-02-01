//frontend/src/components/VideoPlayer.jsx
import React from "react";
const VideoPlayer = () => {
  return (
    <div className="mt-8 rounded-md shadow-md relative" dir="rtl">
      <div className="h-64 bg-gray-300 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">پخش ویدیو</h2>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-700 bg-opacity-60 text-white flex gap-3 justify-center">
        <button className="hover:bg-gray-800 rounded-md px-3 py-1">►</button>
        <button className="hover:bg-gray-800 rounded-md px-3 py-1">❚❚</button>
        <button className="hover:bg-gray-800 rounded-md px-3 py-1">■</button>
      </div>
    </div>
  );
};
export default VideoPlayer;
