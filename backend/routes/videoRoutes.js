const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.getVideos);
router.get('/:videoId', videoController.getVideoById);
router.post('/', videoController.createVideo);
router.put('/:videoId', videoController.updateVideo);
router.delete('/:videoId', videoController.deleteVideo);

module.exports = router;