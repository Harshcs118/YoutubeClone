import React, { createContext, useState, useContext } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <VideoContext.Provider value={{ currentVideo, setCurrentVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(VideoContext);
};