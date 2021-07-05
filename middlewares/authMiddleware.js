import jwt from 'jsonwebtoken'
import { secretKey } from '../settings.js';
function authMiddleware(req,res,next){
    if (req.method == "OPTIONS"){
        next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];//bearer token
        if (!token){
            return res.status(403).json({message:"Пользователь не авторизован"});
        }
        const decodedData = jwt.verify(token,secretKey);
        req.user = decodedData;
        next();
    }
    catch(e){
        console.log(e);
        return res.status(403).json({message:"Пользователь не авторизован"})
    }
};

export {authMiddleware};