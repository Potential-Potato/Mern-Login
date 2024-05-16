import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Post() {
    const [post, setPost] = useState({
        title: '',
        body: '',
    });
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/post');
            setPosts(response.data);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while fetching posts.');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePost = async (e) => {
        e.preventDefault();
        const { title, body } = post;
        try {
            const response = await axios.post('/post', {
                title,
                body,
            });
            if (response.error) {
                toast.error(response.error);
            } else {
                setPost({
                    title: '',
                    body: '',
                });
                toast.success('Post Successful!');
                fetchPosts(); // Fetch posts again to update the list after posting
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while posting.');
        }
    };

    const handleDeletePost = async(postId) => {
        try {
            const response = await axios.delete(`/post/${postId}`);
            toast.success(response.data.message);
            fetchPosts(); // Fetch posts again to update the list after deleting
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while deleting the post.');
        }
    }


    return (
        <div>
            <h1>Post Something!</h1>
            <form onSubmit={handlePost}>
                <div>
                    <label>Title</label>
                    <input type='text' placeholder='enter title' value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
                </div>
                <div>
                    <label>Body</label>
                    <input type='text' placeholder='enter body' value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })} />
                    <button type='submit'>Post</button>
                </div>
            </form>
            <div>
                <h2>All Posts</h2>
                {posts.map((post) => (
                    <div key={post._id}>
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <p>Created by: {post.name}</p>
                            <button onClick={() => {
                                handleDeletePost(post._id)
                            }}>Delete</button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Post;