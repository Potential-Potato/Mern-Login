const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('Test is working')
}

const registerUser = async (req, res) => {
   try{
    const {name, email, password} = req.body //receives it from frontend (/register form)
    //check if valid
    if(!name){
        return res.json({error: 'name is required'})
    }
    if(!password){
        return res.json({error: 'password is required'})
    }
    if(password.length < 6){
        return res.json({error: 'password should be greater than 6'})
    }

    if(!email){
        return res.json({error: 'email is required'})
    }

    //check email
    const exist = await User.findOne({email})
    if(exist){
        return res.json({
            error: 'Email is already taken'
        })
    }


    const hashedPassword = await hashPassword(password) //password hashed
    const user = await User.create({ //creates a user on database
        name,
        email,
        password: hashedPassword
    })

    return res.json(user) //sends user to frontend
    
   }catch (error){
        console.log(error)
   }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body //receives it from frontend (/register form)

        if(!email){
            return res.json({error: 'email is required'})
        }

        if(!password){
            return res.json({error: 'password is required'})
        }

         //check if valid
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }
        
        const match = await comparePassword(password, user.password) //check if password matched
        if(match){
            //token to keep tab on user activity 
            jwt.sign({
                email: user.email,
                id: user._id,
                name: user.name
                },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if(err) throw err
                    res.cookie('token', token).json(user)                
                }
                )
        }
        if(!match){
            return res.json({
                error: 'password do not match'
            })
        }

    }catch(error){
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, decodedToken) => {
            if (err) {
                throw err;
            } else {
                // Include the decoded token in the response
                const user = {
                    ...decodedToken,
                    token: token // Add the token to the user object
                };
                res.json(user); // Sends user to frontend
            }
        });
    } else {
        res.json(null);
    }
};


const handleLogout = (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    handleLogout
}