const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/commentController');


router.post('/addComment/:postid', commentControllers.addComment);
router.delete('/deleteComment', commentControllers.deleteComment);
router.get('/getComment/:postid', commentControllers.getAllCommentsByPost);

module.exports = router;