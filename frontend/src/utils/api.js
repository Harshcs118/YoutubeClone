import axios from 'axios';

const baseUrl = 'http://localhost:5000/api'; // Your API base URL

// Axios interceptors for auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept 401 errors and redirect to login
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      setTimeout(() => (window.location.href = '/login'), 3000);
    }
    return Promise.reject(error);
  }
);

// Video API
export const fetchVideos = async (searchTerm, category) => {
  try {
    const url = `${baseUrl}/videos${searchTerm ? `?q=${searchTerm}` : ''}${category ? `&category=${category}` : ''}`;
    const response = await axios.get(url);
    if (response.data.length === 0) {
      return {
        videos: [],
        message: 'No videos found.',
      };
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch videos. Please try again later.');
  }
};

export const fetchVideoById = async (videoId) => {
  try {
    const response = await axios.get(`${baseUrl}/videos/${videoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createVideo = async (videoData) => {
  try {
    const response = await axios.post(`${baseUrl}/videos`, videoData);
    return response.data;
  } catch (error) {
    console.error('[API] Error creating video:', error.message);
    throw error;
  }
};

export const updateVideo = async (videoId, videoData) => {
  try {
    const response = await axios.put(`${baseUrl}/videos/${videoId}`, videoData);
    return response.data;
  } catch (error) {
    console.error('[API] Error updating video:', error.message);
    throw error;
  }
};

export const deleteVideo = async (videoId) => {
  try {
    const response = await axios.delete(`${baseUrl}/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('[API] Error deleting video:', error.message);
    throw error;
  }
};

// User API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('[API] Error registering user:', error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, credentials);
    console.log('Login Request:', credentials); // Log the request data
    console.log('Login Response:', response.data); // Log the response data

    const { token, message } = response.data; 

    if (!token) { // Check only for token presence
      throw new Error('Login failed: Invalid credentials'); 
    }

    return { token, user: message }; // Assuming 'message' contains user data
  } catch (error) {
    console.error('Login Error:', error); // Log the error
    throw error.response?.data?.message || 'Login failed. Please try again.'; 
  }
};





export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('[API] Error fetching user profile:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to fetch user profile.' };
  }
};

// Channel API
export const fetchChannels = async () => {
  try {
    const response = await axios.get(`${baseUrl}/channels`);
    return response.data;
  } catch (error) {
    console.error('[API] Error fetching channels:', error.response?.data || error.message);
    throw new Error('Failed to fetch channels. Please try again later.');
  }
};

// Fetch a channel by ID
export const fetchChannelById = async (channelId) => {
  try {
    const response = await axios.get(`<span class="math-inline">\{baseUrl\}/channels/</span>{channelId}`); 
    return response.data;
  } catch (error) {
    console.error('[API] Error fetching channel:', error);
    throw new Error('Error fetching channel.'); 
  }
};

// Create a new channel
export const createChannel = async (channelData) => {
  try {
    const response = await axios.post(`${baseUrl}/channels`, channelData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Check if the request was successful (e.g., status code 200 or 201)
    if (response.status === 200 || response.status === 201) {
      return response.data; // Return the created channel data 
    } else {
      throw new Error('Failed to create channel. Server returned an error.'); 
    }
  } catch (error) {
    console.error('[API] Error creating channel:', error.response?.data || error.message);
    console.error('[API] Full Error:', error);
    throw new Error('Failed to create channel. Please try again later.');
  }
};


// Update a channel
export const updateChannel = async (channelId, channelData) => {
  try {
    const response = await axios.put(`${baseUrl}/channels/${channelId}`, channelData);
    return response.data;
  } catch (error) {
    console.error('[API] Error updating channel:', error.response?.data || error.message);
    throw new Error(`Failed to update channel with ID ${channelId}. Please try again later.`);
  }
};

// Delete a channel
export const deleteChannel = async (channelId) => {
  try {
    const response = await axios.delete(`${baseUrl}/channels/${channelId}`);
    return response.data;
  } catch (error) {
    console.error('[API] Error deleting channel:', error.response?.data || error.message);
    throw new Error(`Failed to delete channel with ID ${channelId}. Please try again later.`);
  }
};

// Comment API
export const fetchCommentsByVideoId = async (videoId) => {
  try {
    const response = await axios.get(`${baseUrl}/comments/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('[API] Error fetching comments:', error.message);
    throw error;
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${baseUrl}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('[API] Error creating comment:', error.message);
    throw error;
  }
};

export const updateComment = async (commentId, commentData) => {
  try {
    const response = await axios.put(`${baseUrl}/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    console.error('[API] Error updating comment:', error.message);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${baseUrl}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('[API] Error deleting comment:', error.message);
    throw error;
  }
};
