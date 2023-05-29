const express = require('express');
const router = express.Router();
const CommentController = require('../Controller/Comment.controller');
const auth = require('../Middleware/auth');

router.get('/all', auth, CommentController.getComments);
router.get('/:commentId', auth, CommentController.getCommentById);
router.get('/:field/:value', auth, CommentController.getCommentBy);
router.post('/create', auth, CommentController.createComment);
router.put('/:commentId', auth, CommentController.updateComment);
router.delete('/:commentId', auth, CommentController.deleteComment);

module.exports = router;