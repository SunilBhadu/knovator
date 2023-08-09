const Post = require('../models/Post')

// Task 4: CRUD of Post for the only authenticated user.
const createPost = async (req, res) => {
    const { title, body, created_by, active, latitude, longitude } = req.body
    const newPost = new Post({
        title: title,
        body: body,
        created_by: created_by,
        active: active,
        latitude: latitude,
        longitude: longitude,
        userId: req.userId
    })
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
const updatePost = async (req, res) => {
    const id = req.params.id
    const { title, body, created_by, active, latitude, longitude } = req.body
    const newPost = {
        title: title,
        body: body,
        created_by: created_by,
        active: active,
        latitude: latitude,
        longitude: longitude,
        userId: req.userId
    }
    try {
        await Post.findByIdAndUpdate(id, newPost, { new: true });
        res.status(200).json(newPost);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
const deletePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findByIdAndRemove(id);
        res.status(202).json(post);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
const getPost = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.userId })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
module.exports = {
    createPost, updatePost, deletePost, getPost
}