const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next)=>{
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return res.status(401).json({message: 'Unauthorized. Please login to access this route.'});
    }
    else if(token){
        jwt.verify(token,'secret', (err, decoded) => {
            if(err) return res.status(403).send({message: 'Forbidden. Invalid token.'});
            if(!decoded.isAdmin) return res.status(403).json({message: 'Forbidden. You are not an admin.'});
            next();
        });
    }
}

const verifyLogout = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'Unauthorized. Please login to access this route.'});
    }
    else if(token){
        next()
    }
}

const verifyLogin = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        next()
    }
    else{
        return res.json({message: "You first must logout"})
    }
}

module.exports = {verifyAdmin, verifyLogout, verifyLogin};