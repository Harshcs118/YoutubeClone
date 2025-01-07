import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaFire, FaShoppingCart, FaMusic, FaFilm, 
  FaTv, FaGamepad, FaNewspaper, FaGraduationCap, 
  FaPodcast, FaCrown, FaPencilAlt, 
  FaHeadphones, FaChild, FaCog, 
  FaHistory, FaQuestionCircle, 
  FaInfoCircle, FaUserGraduate, 
  FaAd, FaCode, FaShieldAlt, 
  FaPlayCircle 
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed left-0 w-64 bg-gray-100 shadow-lg transition-transform duration-300 ease-in-out z-20
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          top-14 bottom-0
        `}
      >
        {/* Scrollable content area */}
        <div className="h-full overflow-y-auto px-4 py-2">
          <ul className="space-y-4">
            {/* Main Navigation */}
            <li>
              <Link to="/" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link to="/trending" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaFire className="mr-2" /> Trending
              </Link>
            </li>
            <li>
              <Link to="/shopping" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaShoppingCart className="mr-2" /> Shopping
              </Link>
            </li>
            <li>
              <Link to="/music" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaMusic className="mr-2" /> Music
              </Link>
            </li>
            <li>
              <Link to="/films" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaFilm className="mr-2" /> Films
              </Link>
            </li>
            <li>
              <Link to="/live" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaTv className="mr-2" /> Live
              </Link>
            </li>
            <li>
              <Link to="/gaming" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaGamepad className="mr-2" /> Gaming
              </Link>
            </li>
            <li>
              <Link to="/news" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaNewspaper className="mr-2" /> News
              </Link>
            </li>
            <li>
              <Link to="/courses" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaGraduationCap className="mr-2" /> Courses
              </Link>
            </li>
            <li>
              <Link to="/podcasts" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaPodcast className="mr-2" /> Podcasts
              </Link>
            </li>

            <hr className="my-2 border-gray-300" />

            {/* YouTube Features */}
            <li>
              <Link to="/premium" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaCrown className="mr-2" /> YouTube Premium
              </Link>
            </li>
            <li>
              <Link to="/studio" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaPencilAlt className="mr-2" /> YouTube Studio
              </Link>
            </li>
            <li>
              <Link to="/music" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaHeadphones className="mr-2" /> YouTube Music
              </Link>
            </li>
            <li>
              <Link to="/kids" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaChild className="mr-2" /> YouTube Kids
              </Link>
            </li>

            <hr className="my-2 border-gray-300" />

            {/* Settings and Help */}
            <li>
              <Link to="/settings" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaCog className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              <Link to="/history" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaHistory className="mr-2" /> Report history
              </Link>
            </li>
            <li>
              <Link to="/help" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaQuestionCircle className="mr-2" /> Help
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                Send feedback
              </Link>
            </li>

            <hr className="my-2 border-gray-300" />

            {/* About and Legal */}
            <li>
              <Link to="/about" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaInfoCircle className="mr-2" /> About
              </Link>
            </li>
            <li>
              <Link to="/creator" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaUserGraduate className="mr-2" /> Creator
              </Link>
            </li>
            <li>
              <Link to="/advertise" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaAd className="mr-2" /> Advertise
              </Link>
            </li>
            <li>
              <Link to="/developers" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaCode className="mr-2" /> Developers
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaShieldAlt className="mr-2" /> Privacy & Safety
              </Link>
            </li>
            <li>
              <Link to="/testnewfeatures" className="flex items-center text-gray-800 hover:text-red-500 hover:bg-gray-200 p-2 rounded-lg">
                <FaPlayCircle className="mr-2" /> Test new features
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;