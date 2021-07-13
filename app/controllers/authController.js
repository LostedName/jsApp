import bcrypt from 'bcrypt'
import validator from 'express-validator'
import {secretKey} from '../../settings.js'
import {generateToken} from '../services/jwt.js'
import db from '../services/db.js';
const {validationResult} = validator;
class AuthController{
    async registration(req,res){
        try{
        const models = db.getModels();
        const errors = validationResult(req);
        if (!errors.isEmpty()){
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
    async login(req,res){
        try{
        const models = db.getModels();
        const {login, password} = req.body;
        const user = await models.User.findOne({where: {login}});
        if (!user){
           return res.status(400).json({message:"Пользователь с таким именем не зарегистрирован"});
        }
        const {login:dbLogin,password:dbPassword} = user;
        const isCorrectPass = await bcrypt.compare(password,dbPassword);
        if (!isCorrectPass)
        return res.status(400).json({message:"Неверный пароль"});    

        const token = generateToken(user.id);
        res.status(200).json({token});    

    }catch(e){
            console.log(e);
        }
    }
    async getUsers(req,res){
        try{
            const models = db.getModels();
            const users = await models.User.findAll();
            console.log(req.user.id);
            res.status(200).json(users);
        }catch(e){
            console.log(e);
            
        }
    }
}
export {AuthController}