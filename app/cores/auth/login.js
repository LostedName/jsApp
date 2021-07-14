import bcrypt from 'bcrypt'
import {generateToken} from '../../services/jwt.js'
import db from '../../services/db.js';
export const login = async function({login, password}){
    try{
    const models = db.getModels();
    const userExists = await models.User.findOne({where: {login}});
    if (!userExists){
       return {message:"Пользователь с таким именем не зарегистрирован"};
    }
    if (!await bcrypt.compare(password,userExists.password))
    return {message:"Неверный пароль"};    

    const token = generateToken(userExists.id);
    return {token};    

}catch(e){
        console.log(e);
    }
}