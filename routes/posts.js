const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/postsCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/posts')
    .get(postsCtrl.getPosts)
    .post(auth, postsCtrl.createPosts)

router.route('/posts/:id')
    .delete(auth, postsCtrl.deletePosts)
    .put(auth, postsCtrl.updatePosts)

router.route('/post/comment/:id')
    .post(auth, postsCtrl.commentPosts)

router.route('/post/comment/:id/:comment_id')
    .put(auth, postsCtrl.updateCommentPosts)
    .delete(auth, postsCtrl.deleteCommentPosts)


// bi loi ben phan react ko nhan headers: {Authorization: token} 

// router.route('/post/like/:id')
//     .put(auth, postsCtrl.likePosts)

// router.route('/post/unlike/:id')
//     .put(auth, postsCtrl.unlikePosts)

module.exports = router ;