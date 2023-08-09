const Post = require('../models/Post')

// Task 4: CRUD of Post for the only authenticated user.
const checkingLatLong = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        const posts = await Post.find({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            active: true
        });

        res.json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'An error occurred while retrieving posts.' });
    }
}
module.exports = {
    checkingLatLong
}