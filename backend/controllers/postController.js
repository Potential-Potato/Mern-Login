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
            createdby : req.user.id,
            name: req.user.name
        })

        return res.json(newPost)

    }catch(error){
        console.log(error)
    } 
}

const getPost = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePost = async (req, res) => {
    try{
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId)
        if(!deletedPost){
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error)
    }
}

module.exports = {
    handlePost,
    getPost,
    deletePost
}