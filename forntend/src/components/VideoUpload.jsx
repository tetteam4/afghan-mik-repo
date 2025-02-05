// frontend/src/components/VideoUpload.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadError(null); // Clear any previous errors

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post("/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Video uploaded successfully:", response.data);
        setUploadSuccess(true);
      } else {
        console.error("Error uploading video:", response.status, response.data);
        setUploadError("Video upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadError(
        "Video upload failed. Please check the console for details."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="video-upload-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="video"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Video File
          </label>
          <input
            type="file"
            id="video"
            onChange={handleVideoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            accept="video/*" // Only allow video files
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {uploadSuccess && (
        <p className="text-green-500 mt-2">Video uploaded successfully!</p>
      )}
      {uploadError && <p className="text-red-500 mt-2">Error: {uploadError}</p>}
    </div>
  );
};

export default VideoUpload;
