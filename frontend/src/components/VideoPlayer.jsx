import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { useVideo } from '../context/VideoContext'; // Assuming you have a VideoContext
import { fetchVideoById } from '../utils/api';

const VideoPlayer = () => {
  const { videoId } = useParams(); 
  const { user } = useAuth();
  const { setCurrentVideo } = useVideo(); 
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const fetchedVideo = await fetchVideoById(videoId);
        setVideo(fetchedVideo);
        setCurrentVideo(fetchedVideo); // Update VideoContext
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchVideo();
  }, [videoId, setCurrentVideo]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <ReactPlayer 
        url={video.videoUrl} // Assuming you have a 'videoUrl' field in your Video model
        width="800px" 
        height="450px" 
      />
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-gray-600">{video.description}</p>
        <p>
          Uploaded by: 
          <span className="font-semibold">{video.uploader.username}</span> 
          on {new Date(video.uploadDate).toLocaleDateString()}
        </p>
        <div className="flex space-x-4 mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Like</button>
          <button className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-md">Dislike</button>
          {/* Add Share button here */}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;