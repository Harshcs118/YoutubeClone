const Channel = require('../models/Channel');
const { channelSchema } = require('../utils/validate');

const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate('owner');
    res.status(200).json(channels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId)
      .populate('owner')
      .populate('videos');
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;

    // Check if 'channelName' is provided
    if (!channelName || !channelName.trim()) {
      return res.status(400).json({ message: '"channelName" is required' });
    }

    const newChannel = new Channel({
      channelName,
      description,
      owner: req.userId, // Assuming you have middleware to extract userId from JWT
    });

    const savedChannel = await newChannel.save();

    res.status(201).json(savedChannel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateChannel = async (req, res) => {
  try {
    // Validate request body
    const { error } = channelSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { channelName, description } = req.body;
    const channel = await Channel.findById(req.params.channelId);

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    channel.channelName = channelName;
    channel.description = description;

    await channel.save();

    res.status(200).json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndDelete(req.params.channelId);

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.status(200).json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getChannels, getChannelById, createChannel, updateChannel, deleteChannel };