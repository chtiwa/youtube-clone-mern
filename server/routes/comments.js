const express = require('express')
const router = express.Router()
const { createComment, getComments, createNestedComment, getNestedComments, deleteComment, likeComment, dislikeComment, unlikeComment, undislikeComment } = require('../controllers/comments')
const authentication = require('../middleware/authentication')

router.route('/like/:commentId').patch(authentication, likeComment)
router.route('/unlike/:commentId').patch(authentication, unlikeComment)
router.route('/dislike/:commentId').patch(authentication, dislikeComment)
router.route('/undislike/:commentId').patch(authentication, undislikeComment)
router.route('/delete/:commentId').delete(authentication, deleteComment)
router.route('/nested/:parentId').get(getNestedComments)
router.route('/nested/:videoId/:parentId').post(authentication, createNestedComment)
router.route('/:videoId').post(authentication, createComment)
router.route('/:videoId/:filter').get(getComments)

module.exports = router