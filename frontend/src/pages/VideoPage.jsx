import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import CommentSection from '../components/CommentSection';

const VideoPage = () => {
  return (
    <div className="container mx-auto">
      <VideoPlayer />
      <CommentSection /> 
    </div>
  );
};

export default VideoPage;