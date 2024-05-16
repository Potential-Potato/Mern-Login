const express = require('express')
const router = express.Router()
const cors = require('cors')
const auth = require('../middleware/authorization.js')
const { test, registerUser, loginUser, getProfile, handleLogout} = require('../controllers/authController')
const {handlePost, getPost, deletePost} = require('../controllers/postController')
// middleware cors
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', handleLogout);
router.get('/profile',auth, getProfile)
// auth is a middleware used to get a cokkie and check if the user is authorised or not and also set the user info in the req.user
// without login in this route can't be acessible so request will be rejected 
router.post('/post',auth, handlePost)
router.delete('/post/:id',auth, deletePost)
router.get('/post', auth, getPost)

module.exports = router