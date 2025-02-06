import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import {
  FaHeart,
  FaComment,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaUserPlus,
  FaUserCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const VideoHistory = () => {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/videos");
        setStories(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError("Failed to load stories. Please try again.");
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const handleStoryClick = (index) => {
    setCurrentStoryIndex(index);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const handleCloseStory = () => {
    setCurrentStoryIndex(null);
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  const handleLike = (storyId) => {
    console.log(`Liked story with ID: ${storyId}`);
  };

  const handleCommentSubmit = (storyId, comment) => {
    console.log(
      `Comment submitted for story with ID: ${storyId}, Comment: ${comment}`
    );
    setShowCommentModal(false); // Close the modal after submitting
  };

  const goToPreviousStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : stories.length - 1
    );
  };

  const goToNextStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex < stories.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (loading) {
    return (
      <div className="text-center py-4 text-gray-500">Loading stories...</div>
    );
  }
  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative py-4" dir="rtl">
      <div className="flex gap-4 overflow-x-auto p-2">
        {stories.map((story, index) => (
          <div
            key={story._id}
            className="flex flex-col items-center w-24 flex-shrink-0 cursor-pointer"
            onClick={() => handleStoryClick(index)}
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-500">
              <img
                src={story.sellerProfilePicture}
                alt={story.sellerName}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm mt-1 text-center text-gray-700">
              {story.sellerName}
            </p>
          </div>
        ))}
      </div>

      {currentStoryIndex !== null && (
        <StoryViewer
          story={stories[currentStoryIndex]}
          onClose={handleCloseStory}
          onPauseToggle={handlePauseToggle}
          isPaused={isPaused}
          onLike={handleLike}
          onCommentSubmit={handleCommentSubmit}
          goToPreviousStory={goToPreviousStory}
          goToNextStory={goToNextStory}
          showCommentModal={showCommentModal}
          setShowCommentModal={setShowCommentModal}
        />
      )}
    </div>
  );
};

const StoryViewer = ({
  story,
  onClose,
  onPauseToggle,
  isPaused,
  onLike,
  onCommentSubmit,
  goToPreviousStory,
  goToNextStory,
  showCommentModal,
  setShowCommentModal,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const storyViewerRef = useRef(null);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit(story._id, commentText);
    setCommentText("");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    console.log(`Followed seller: ${story.sellerName}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(story.videoUrl);
    console.log("Link copied to clipboard:", story.videoUrl);
    alert("Link copied to clipboard!");
  };

  // Close the story viewer when clicking outside
  const handleClickOutside = (e) => {
    if (storyViewerRef.current && !storyViewerRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div
        className="relative w-full max-w-md h-[90vh] justify-center items-center rounded-lg  flex flex-col"
        ref={storyViewerRef}
      >
        {/* Seller Profile Section */}
        <div className="flex items- py-1  gap-5">
          <button className="text-white hover:text-gray-900" onClick={onClose}>
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Video Section */}
        <div className="flex-grow relative">
          <video
            src={story.videoUrl}
            controls
            className="w-[350px] h-[600px] object-cover"
            autoPlay
            loop
            // muted
          />
        </div>

        {/* Navigation Arrows (Outside Video) */}
        <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-20 ">
          <button
            className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            onClick={goToPreviousStory}
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 ">
          <button
            className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 -right-"
            onClick={goToNextStory}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Action Buttons (Outside Video, Left Side) */}
        <div className="absolute bottom-4 left-14 flex mb-10  flex-col space-y-4">
          <button
            className="ml-auto text-sm text-blue-500 hover:text-blue-700 "
            onClick={handleFollow}
          >
            {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
          </button>
          <button
            className="text-white hover:text-red-500"
            onClick={() => onLike(story._id)}
          >
            <FaHeart className="w-6 h-6" />
          </button>
          <button
            className="text-white hover:text-blue-500"
            onClick={() => setShowCommentModal(true)}
          >
            <FaComment className="w-6 h-6" />
          </button>
          <button
            className="text-white hover:text-green-500"
            onClick={handleShare}
          >
            <FaShareAlt className="w-6 h-6" />
          </button>
          <div className=" items-center  border-b ">
            <Link to="seller?id/profile">
              <img
                // src={story.sellerProfilePicture}
                src={`../../public/on/1.jpg`}
                alt={story.sellerName}
                className="w-10 h-10 rounded-full"
              />
            </Link>
            <div className=" gap-3 ">
              <p className="font-semibold ">{story.sellerName}</p>
              <p className="text-sm text-gray-100">Seller</p>
            </div>
          </div>
        </div>

        {/* Comment Modal */}
        {showCommentModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
              <form onSubmit={handleSubmit}>
                <textarea
                  placeholder="Write your comment..."
                  value={commentText}
                  onChange={handleCommentChange}
                  className="w-full p-2 border rounded mb-4"
                  rows="4"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setShowCommentModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoHistory;
