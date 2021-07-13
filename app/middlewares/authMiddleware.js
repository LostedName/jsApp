import jwt from 'jsonwebtoken'
import { secretKey } from '../../settings.js';
function tokenReceive(req){    
        return req.headers.authorization.split(' ')[1]; 
}
function tokenVerify(token,secretKey){
    return jwt.verify(token,secretKey);
}
function authMiddleware(req,res,next){
    if (req.method == "OPTIONS"){
        next();
    }
    try{
        if (!tokenReceive(req))
            return res.status(403).json({message:"Пользователь не авторизован"});
        req.user = tokenVerify(tokenReceive(req),secretKey);
        next();
    }
    catch(e){
        console.log(e.name);
            return res.status(403).json({message:"Пользователь не авторизован"})
    }
};

export {authMiddleware};