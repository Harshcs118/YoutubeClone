import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VideoProvider } from './context/VideoContext'; // Import VideoProvider

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VideoPage from './pages/VideoPage';
import ChannelPage from './pages/ChannelPage';

function App() {
  // State to control sidebar visibility
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <VideoProvider> 
      <Router>
        <div className="flex">
          {/* Sidebar visibility controlled by isSidebarOpen */}
          <Sidebar isOpen={isSidebarOpen} />
          <div className="flex-grow">
            {/* Pass toggleSidebar function to Header */}
            <Header onToggleSidebar={toggleSidebar} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/videos/:videoId" element={<VideoPage />} />
              <Route path="/channels/:channelId" element={<ChannelPage />} />
              {/* Add more routes here */}
            </Routes>
          </div>
        </div>
      </Router>
    </VideoProvider>
  );
}

export default App;
