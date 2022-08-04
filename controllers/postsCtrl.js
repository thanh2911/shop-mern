const Posts = require('../models/postModel');
const Users = require('../models/usersModel');

const postsCtrl = {

    getPosts: async (req, res) =>{
        try {

            const posts = await Posts.find();

            res.json(posts)
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPosts: async (req, res) =>{
        try {
            const {text, name, user} = req.body; 

            const userCurrent = await Users.findById(req.user.id).select('-password');

            const newPost = new Posts({
                text,
                name: userCurrent.name,
                user: req.user.id
            })

            await newPost.save()

            res.json({newPost})
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePosts: async (req, res) =>{
        try {

            const {text} = req.body;

            const post =  await Posts.findById(req.params.id); 

            //* Kiem tra post co ton tai hay khong
            if(!post) {
               return res.status(400).json({msg: "Posts not found"})
            }
   
            //* Kiem tra co dung user tao ra post hay ko va post.user: typeof object 
            if(post.user.toString() !== req.user.id) {
               return res.status(400).json({msg: "You are not the owner of the post"})
            }

            await Posts.findOneAndUpdate({_id: req.params.id}, {
                text
            })

            res.json('Update sucess ')
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePosts: async (req, res) =>{
        try {

         const post =  await Posts.findById(req.params.id); 

         //* Kiem tra post co ton tai hay khong
         if(!post) {
            return res.status(400).json({msg: "Posts not found"})
         }

         //* Kiem tra co dung user tao ra post hay ko va post.user: typeof object 
         if(post.user.toString() !== req.user.id) {
            return res.status(400).json({msg: "You are not the owner of the post"})
         }

         await post.remove();

        res.json('Delete sucess')
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    commentPosts: async (req, res) =>{
        try {

            const { text } = req.body;

            const userCurrent = await Users.findById(req.user.id).select('-password');
            const post = await Posts.findById(req.params.id);

            if(!post) {
                return res.status(400).json({msg: "not post"})
            }

            const newComment = {
                text,
                name: userCurrent.name,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            await post.save();

            res.json(post);
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCommentPosts: async (req, res) =>{
        try {

            const { text } = req.body;

            const post = await Posts.findById(req.params.id);

            // Tim comment req.params.comment_id
            const comment = post.comments.find(
                item => item.id === req.params.comment_id
                )

            if(!comment) {
                return res.status(400).json({msg: "comment not found"})
            }

            //* Check user
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }

            comment.text = text ;
      
            await post.save();

            res.json(post);


           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCommentPosts: async (req, res) =>{
        try {

            const post = await Posts.findById(req.params.id);


            const comment = post.comments.find(
                item => item.id === req.params.comment_id
                )

            if(!comment) {
                return res.status(400).json({msg: "you not found"})
            }

            //* Check user
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }

            //* Tim kiem tat ca cac comment !== req.params.comment_id
            post.comments = post.comments.filter(item => 
                item.id !== req.params.comment_id
            )
      
            await post.save();

            res.json(post);
          
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    likePosts: async (req, res) =>{
        try {

            const post = await Posts.findById(req.params.id);

            if(post.likes.some(like => like.user.toString() === req.user.id)) {
                return res.status(400).json({msg: "Post already liked"})
            }

            post.likes.unshift({ user: req.user.id });

            await post.save();

            res.json('Likes')
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unlikePosts: async (req, res) =>{
        try {

            const post = await Posts.findById(req.params.id);

            if(!post.likes.some(like => like.user.toString() === req.user.id)) {
                return res.status(400).json({msg: "you not like post"})
            }

            //* post.likes = filter tim dc vs post.likes.user!== req.user.id
            post.likes = post.likes.filter(
                item => item.user.toString() !== req.user.id
            )

            await post.save();

            res.json('unlike')
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },



}
module.exports = postsCtrl