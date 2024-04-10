const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, getProfile, handleLogout} = require('../controllers/authController')
const handlePost = require('../controllers/postController')
// middleware cors
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/logout', handleLogout);
router.post('/post', handlePost)

module.exports = router