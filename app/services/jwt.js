import jwt from 'jsonwebtoken'
import {secretKey} from '../../settings.js'

export const generateToken = (id,expiresIn = "1h")=>{
    return jwt.sign({id},secretKey, {expiresIn});
};

export function tokenVerify(token,secretKey){
    return jwt.verify(token,secretKey);
};