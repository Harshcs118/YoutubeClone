const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const channelRoutes = require('./routes/channelRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Middleware
const { authMiddleware } = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes); // User Auth Routes (Register/Login/Profile)
app.use('/api/videos', authMiddleware, videoRoutes); // Video Routes (Protected)
app.use('/api/channels', authMiddleware, channelRoutes); // Channel Routes (Protected)
app.use('/api/comments', authMiddleware, commentRoutes); // Comment Routes (Protected)

// Error Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
