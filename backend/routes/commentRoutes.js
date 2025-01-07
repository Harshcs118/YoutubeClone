const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/:videoId/comments', commentController.getCommentsByVideoId);
router.post('/', commentController.createComment);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;