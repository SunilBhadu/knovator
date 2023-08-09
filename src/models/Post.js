const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    body: {
        type : String,
        required : true
    },
    created_by: {
        type : String,
        required : true,
    },
    userId: {
        // userId created by default whenever a new post is created it reteriver its parent (login object id)
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
    active: {
        type : Boolean,
        required : true
    },
    latitude: {
        type : Number,
        required : true
    },
    longitude: {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('Post', postSchema)