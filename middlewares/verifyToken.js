const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next)=>{
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return res.status(401).send({message: 'Unauthorized. Please login to access this route.'});
    }
    else if(token){
        jwt.verify(token,'secret', (err, decoded) => {
            if(err) return res.status(403).send({message: 'Forbidden. Invalid token.'});
            if(!decoded.isAdmin) return res.status(403).send({message: 'Forbidden. You are not an admin.'});
            next();
        });
    }
}

const verifyLogout = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send({message: 'Unauthorized. Please login to access this route.'});
    }
    else if(token){
        jwt.verify(token,'secret', (err, decoded) => {
            if(err) return res.status(403).send({message: 'Forbidden. Invalid token.'});
            next();
        });
    }
}

const verifyLogin = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        jwt.verify(token,'secret', (err, decoded) => {
            if(err) return res.status(403).send({message: 'Forbidden. Invalid token.'});
            next();
        });
        
    }
    else if(token){
        return res.status(401).send({message: 'Unauthorized. Please login to access this route.'});
    }
}

module.exports = {verifyAdmin, verifyLogout, verifyLogin};