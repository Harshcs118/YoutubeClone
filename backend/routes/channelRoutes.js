const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

router.get('/', channelController.getChannels);
router.get('/:channelId', channelController.getChannelById);
router.post('/', channelController.createChannel);
router.put('/:channelId', channelController.updateChannel);
router.delete('/:channelId', channelController.deleteChannel);

module.exports = router;