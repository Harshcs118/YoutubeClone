import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { fetchVideos } from '../utils/api';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeVideos = async () => {
    setIsLoading(true);
    setError(null); // Clear error state before fetching

    try {
      const response = await fetchVideos();
      if (response.videos) {
        setVideos(response.videos);
      } else {
        setVideos([]);
        setError(response.message || 'An error occurred while fetching videos.');
      }
    } catch (error) {
      setError('Failed to load videos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-lg">Loading videos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">Error: {error}</p>
          <button
            onClick={fetchHomeVideos}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">No videos available. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
