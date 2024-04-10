const Post = require('../models/post')

const handlePost = async (req, res) => { //how about the user id on cookie?
    try{
        // console.log(req.user)  // req.user holds information aboout the object 
        /* 
            In this format
            {
                email: user.email,
                id: user._id,
                name: user.name
            }
        */
        
        const {title, body} = req.body
        if(!title || !body){
            return res.json({error: 'All field is required to post'})
        }

        const newPost = await Post.create({
            title,
            body,
            createdby : req.user.id
        })

        return res.json(newPost)

    }catch(error){
        console.log(error)
    } 
}

module.exports = handlePost