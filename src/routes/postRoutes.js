const express = require('express');
const postRouter = express.Router();
const { getPost, updatePost, deletePost, createPost } = require('../controllers/postController');
const auth = require('../middlewares/auth');

// every user can post only their post as we are using auth as middleware 
postRouter.post('/', auth, createPost);

// every user can get only their post as we are using auth as middleware 
postRouter.get('/', auth, getPost);

// here id is post id 
postRouter.put('/:id', auth, updatePost);

postRouter.delete('/:id', auth, deletePost);

module.exports = postRouter;