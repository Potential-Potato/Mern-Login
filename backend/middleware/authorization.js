const jwt = require("jsonwebtoken")
if (process.env.NODE_ENV !== 'production'){ //check if app is running on prod
    require('dotenv').config()
}
const auth = async(req,resp,next)=>{
        
    const { token } = req.cookies;
    // console.log(token)
    if (!token){
        return resp.status(403).send("Not Authorize");
    }
    try{
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        next();
    }catch(err){
        resp.status(401).json({ msg: "Token is not valid" });
    }
}


module.exports = auth;