import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/videos/${video._id}`} className="block p-2">
      <div className="relative">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full rounded-md" />
        <div className="absolute bottom-0 left-0 p-2 bg-gray-800/50 text-white">
          <p className="text-xs truncate">{video.title}</p>
          <p className="text-xs">{video.channelName}</p>
          <p className="text-xs">Views: {video.views}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;