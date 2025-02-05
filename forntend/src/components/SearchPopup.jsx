// frontend/src/components/VideoHistory.jsx
import React, { useState } from "react";

const VideoHistory = () => {
  const [currentStory, setCurrentStory] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const stories = [
    {
      id: 1,
      userName: "کاربر 1",
      userImg: "/on/75 x 55-02.png",
      videoUrl: "/on/915505290738400v.mp4",
      imageUrl: "https://placekitten.com/100/150",
    },
    {
      id: 2,
      userName: "کاربر 2",
      userImg: "https://placekitten.com/41/41",
      videoUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
      imageUrl: "https://placekitten.com/100/151",
    },
    {
      id: 3,
      userName: "کاربر 3",
      userImg: "https://placekitten.com/42/42",
      videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
      imageUrl: "https://placekitten.com/100/152",
    },
    {
      id: 4,
      userName: "کاربر 4",
      userImg: "https://placekitten.com/43/43",
      videoUrl: "https://www.youtube.com/embed/9U2289mY74o",
      imageUrl: "https://placekitten.com/100/153",
    },
    {
      id: 5,
      userName: "کاربر 5",
      userImg: "https://placekitten.com/44/44",
      videoUrl: "https://www.youtube.com/embed/0I657o4wOyk",
      imageUrl: "https://placekitten.com/100/154",
    },
    {
      id: 6,
      userName: "کاربر 6",
      userImg: "https://placekitten.com/45/45",
      videoUrl: "https://www.youtube.com/embed/8fE-0nI89Lw",
      imageUrl: "https://placekitten.com/100/155",
    },
    {
      id: 7,
      userName: "کاربر 7",
      userImg: "https://placekitten.com/46/46",
      videoUrl: "https://www.youtube.com/embed/5o2t-o9q03I",
      imageUrl: "https://placekitten.com/100/156",
    },
    {
      id: 8,
      userName: "کاربر 8",
      userImg: "https://placekitten.com/47/47",
      videoUrl: "https://www.youtube.com/embed/L_o_x19F5c4",
      imageUrl: "https://placekitten.com/100/157",
    },
  ];

  const handleStoryClick = (storyId) => {
    setCurrentStory(storyId);
  };
  const handleCloseVideo = () => {
    setCurrentStory(null);
  };
  const handleTogglePlay = () => {
    setIsPaused(!isPaused);
  };
  return (
    <div className="mt-8 relative" dir="rtl">
      <div className="flex gap-4 overflow-x-auto p-2">
        {stories.map((story) => (
          <div
            onClick={() => handleStoryClick(story.id)}
            key={story.id}
            className="flex flex-col items-center w-24 flex-shrink-0"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-500 cursor-pointer">
              <img
                src={story.userImg}
                alt={story.userName}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm mt-1 text-center">{story.userName}</p>
          </div>
        ))}
      </div>
      {currentStory && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-md shadow-lg p-4">
            <div className="flex justify-between items-center pb-2">
              <span className="font-bold">
                {stories.find((story) => story.id === currentStory).userName}
              </span>
              <button
                className="text-gray-500 hover:text-gray-700 text-xl"
                onClick={handleCloseVideo}
              >
                X
              </button>
            </div>
            <iframe
              width="400"
              height="300"
              src={`${
                stories.find((story) => story.id === currentStory).videoUrl
              }?autoplay=1&mute=0`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
export default VideoHistory;
