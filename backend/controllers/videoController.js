const Video = require('../models/Video');
const { videoSchema } = require('../utils/validate');

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('channelId').populate('uploader');
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId)
      .populate('channelId')
      .populate('uploader')
      .populate('comments');
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createVideo = async (req, res) => {
  try {
    // Validate request body
    const { error } = videoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, thumbnailUrl, channelId } = req.body;

    const newVideo = new Video({
      title,
      description,
      thumbnailUrl,
      channelId,
      uploader: req.userId, // Assuming you have middleware to extract userId from JWT
    });

    const savedVideo = await newVideo.save();

    res.status(201).json(savedVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateVideo = async (req, res) => {
  try {
    // Validate request body
    const { error } = videoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, thumbnailUrl } = req.body;
    const video = await Video.findById(req.params.videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.title = title;
    video.description = description;
    video.thumbnailUrl = thumbnailUrl;

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getVideos, getVideoById, createVideo, updateVideo, deleteVideo };