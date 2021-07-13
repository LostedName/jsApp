import db from '../../services/db.js';
import bcrypt from 'bcrypt'
import validator from 'express-validator'
const {validationResult} = validator;
export const registration = async function(req,res){
    try{
    const models = db.getModels();
    if (!validationResult(req).isEmpty()){
        return res.status(400).json({message:"Ошибка при регистрации",errors});
    }
    let {login,password,photo} = req.body;
    const reg_date = new Date().toLocaleDateString();
    const candidate = await models.User.findOne({where:{login:login}})
    if (candidate){
        return res.status(400).json({message:"Пользователь с таким именем уже существует"});
    }
    password = await bcrypt.hash(password, 10);
    await models.User.create({
        login,
        password,
        reg_date,
        photo
    }).then(responce=>{
        console.log(responce);
        res.status(200).json({message:"Пользователь успешно зарегистрирован."});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({message:"Возникли проблемы при регистрации, повторите позже."});
    });
    }catch(e){
        console.log(e);
        res.status(400).json({message:"Registration error"});
    }
}
