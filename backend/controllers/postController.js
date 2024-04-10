const Post = require('../models/post')

const handlePost = async (req, res) => { //how about the user id on cookie?
    try{
        const {title, body} = req.body
        if(!title || !body){
            return res.json({error: 'All field is required to post'})
        }

        const newPost = await Post.create({
            title,
            body,
        })

        return res.json(newPost)

    }catch(error){
        console.log(error)
    } 
}

module.exports = handlePost