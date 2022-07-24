const express = require('express');
const router = express.Router();
const likeControllers = require('../controllers/likeControllers');
const auth = require('../utils/authMiddleware');

router.post('/', likeControllers.addLike);
router.put('/:id', likeControllers.updateLike);
router.delete('/:id', likeControllers.deleteLike);
router.get('/post/:postid', likeControllers.getLikesByPost);

module.exports = router;