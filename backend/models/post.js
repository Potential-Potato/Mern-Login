const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    sessionId: String, 
    title: String,
    description: String,
    body: String
})

const postModel = mongoose.model('Post', postSchema)
module.exports = postModel