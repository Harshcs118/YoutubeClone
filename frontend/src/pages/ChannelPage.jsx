import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChannelById, createChannel, deleteChannel } from '../utils/api';
import { Button } from '../components/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs'; // Assuming you have Tabs component
import { FaSpinner } from 'react-icons/fa';
import { Bell, Share2, ThumbsUp, Video } from 'react-feather';

const ChannelPage = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        if (!channelId) {
          throw new Error('Invalid channel ID');
        }
        const fetchedChannel = await fetchChannelById(channelId);
        setChannel(fetchedChannel);
      } catch (err) {
        console.error('Error fetching channel:', err);
        setError('Error loading channel data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchChannel();
  }, [channelId]);

  const handleDeleteChannel = async () => {
    if (!window.confirm('Are you sure you want to delete this channel? This action cannot be undone.')) {
      return; // Exit if user cancels confirmation
    }
    try {
      await deleteChannel(channelId);
      navigate('/channels'); // Redirect to channels list after deletion
    } catch (err) {
      setError('Error deleting channel. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Channel Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500">
          <img
            src={channel.coverImage || "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0"}
            alt="Channel Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end -mt-12 sm:-mt-16 sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-background"
                src={channel.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2"}
                alt="Channel Avatar"
              />
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                <h1 className="text-2xl font-bold text-foreground truncate">{channel?.channelName || 'Channel Name'}</h1> 
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{channel.subscribers} subscribers</span>
                  <span>•</span>
                  <span>{channel?.videos?.length || 0} videos</span> 
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-3">
                <Button className="mt-2 sm:mt-0">
                  Subscribe
                  <Bell className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="mt-2 sm:mt-0">
                  Share
                  <Share2 className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="danger" 
                  className="mt-2 sm:mt-0" 
                  onClick={handleDeleteChannel}
                >
                  Delete
                </Button> 
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="videos" className="space-y-6">
          {/* ... (rest of the Tabs component) */}
        </Tabs>
      </div>
    </div>
  );
};

export default ChannelPage;