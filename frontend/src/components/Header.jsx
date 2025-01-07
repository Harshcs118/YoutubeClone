import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthContext from '../context/AuthContext';
import { Menu, Search, Mic, Upload, Plus, User, X } from 'lucide-react';
import { createChannel, createVideo } from '../utils/api'; // Import your API functions

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null); // State for video file
  const [videoTitle, setVideoTitle] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null); // State for video title
  const [videoDescription, setVideoDescription] = useState(''); // State for video description
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsChannelModalOpen(false);
        setIsVideoModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleCreateChannel = async () => {
    if (!channelName.trim()) {
      alert('Please enter a valid channel name.');
      return;
    }
    try {
      const channelData = { 
        channelName, 
        description: channelDescription 
      };
      const newChannel = await createChannel(channelData); // API call
      alert('Channel created successfully!');
      setChannelName(''); // Clear inputs
      setChannelDescription('');
      setIsChannelModalOpen(false); // Close modal
      navigate(`/channels/${newChannel.id}`); // Navigate to the new channel
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  const handleUploadVideo = async () => {
    if (!videoFile) {
      alert('Please select a video file.');
      return;
    }
    if (!thumbnailFile) {
      alert('Please select a thumbnail file.');
      return;
    }
    if (!videoTitle.trim()) {
      alert('Please enter a video title.');
      return;
    }
    if (!videoDescription.trim()) {
      alert('Please enter a video description.');
      return;
    }
  
    try {
      const videoData = new FormData();
      videoData.append('videoFile', videoFile);
      videoData.append('thumbnail', thumbnailFile); // Include thumbnail
      videoData.append('title', videoTitle);
      videoData.append('description', videoDescription);
  
      // Log the FormData contents for debugging
      console.log('Uploading video with data:', {
        title: videoTitle,
        description: videoDescription,
        videoFile: videoFile.name,
        thumbnailFile: thumbnailFile.name, // Log the thumbnail file name
      });
  
      const newVideo = await createVideo(videoData); // API call
      alert('Video uploaded successfully!');
      setVideoFile(null); // Clear inputs
      setThumbnailFile(null); // Clear thumbnail
      setVideoTitle('');
      setVideoDescription('');
      setIsVideoModalOpen(false); // Close modal
      navigate(`/videos/${newVideo.id}`); // Navigate to the new video
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video: ' + error.message);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 h-12 md:h-14 lg:h-16">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center">
            <img
              src="./src/assets/YouTube_Logo_2017.svg.png"
              alt="Your Logo"
              className="h-6 md:h-7 lg:h-7"
            />
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className="hidden sm:flex items-center flex-1 justify-center max-w-2xl px-4">
          <div className="flex items-center flex-1 max-w-[600px] px-4">
            <div className="flex-1 flex items-center border rounded-l-full border-gray-300 hover:border-blue-500 focus-within:border-blue-500 pl-4">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 px-2 outline-none text-sm"
              />
            </div>
            <button className="px-6 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-100">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full ml-2">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Button */}
        <button className="sm:hidden p-2 hover:bg-gray-100 rounded-full">
          <Search className="w-6 h-6" />
        </button>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            {user && (
              <>
                {/* Plus Icon for Creating Channel */}
                <button
                  onClick={() => setIsChannelModalOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Create Channel"
                >
                  <Plus className="w-6 h-6" />
                </button>
                {/* Upload Icon for Uploading Video */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Upload Video"
                >
                  <Upload className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {user && (
            <div className="relative">
              <img
                src={user.avatar || '/path-to-user-avatar.png'}
                alt="User  Avatar"
                className="h-8 w-8 rounded-full border border-gray-300 cursor-pointer"
                onClick={toggleMenu}
              />
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white shadow-xl rounded-lg overflow-hidden z-50 transition-all ease-in-out duration-300">
                  <button
                    onClick={() => setIsChannelModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                  >
                    <Plus className="w-5 h-5" />
                    Create Channel
                  </button>
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Video
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                  >
                    <User  className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2">
            {user ? (
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text -white px-4 py-2 rounded-md text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Spacer below header */}
      <div className="h-12 md:h-14 lg:h-16"></div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Modal for Creating Channel */}
      {isChannelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Create Channel</h2>
              <button onClick={() => setIsChannelModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter channel name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <textarea
              placeholder="Enter channel description"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              onClick={handleCreateChannel}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* Modal for Uploading Video */}
{isVideoModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div
      ref={modalRef}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Upload Video</h2>
        <button onClick={() => setIsVideoModalOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter video title"
        value={videoTitle}
        onChange={(e) => setVideoTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />
      <textarea
        placeholder="Enter video description"
        value={videoDescription}
        onChange={(e) => setVideoDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
        className="mb-4"
      />
      <input
        type="file"
        accept="image/*" // Accept image files for the thumbnail
        onChange={(e) => setThumbnailFile(e.target.files[0])} // Set the thumbnail file
        className="mb-4"
      />
      <button
        onClick={handleUploadVideo}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Upload
      </button>
    </div>
  </div>
)}
    </>
  );
};

export default Header