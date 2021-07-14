import db from '../../services/db.js';
import bcrypt from 'bcrypt'
import validator from 'express-validator'
const {validationResult} = validator;
export const registration = async function(req){
    try{
    const models = db.getModels();
    if (!validationResult(req).isEmpty()){
        return {message:"Ошибка при регистрации",errors};
    }
    let {login,password,photo} = req.body;
    const reg_date = new Date().toLocaleDateString();
    const candidate = await models.User.findOne({where:{login:login}})
    if (candidate){
        return {message:"Пользователь с таким именем уже существует"};
    }
    password = await bcrypt.hash(password, 10);
    await models.User.create({
        login,
        password,
        reg_date,
        photo
    })  
    return {message:"Пользователь успешно зарегистрирован."};
    }catch(e){
        console.log(e);
        return {message:"Возникли проблемы при регистрации, повторите позже."};

    }
}
