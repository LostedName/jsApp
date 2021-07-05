import {User} from './dbModels.js'
import bcrypt from 'bcrypt'
import validator from 'express-validator'
const {validationResult} = validator;
class AuthController{
    async registration(req,res){
        try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({message:"Ошибка при регистрации",errors});
        }
        let {login,password,photo} = req.body;
        const reg_date = new Date().toString();
        const candidate = await User.findOne({where:{login:login}})
        if (candidate){
            return res.status(400).json({message:"Пользователь с таким именем уже существует"});
        }
        password = await bcrypt.hash(password, 10);
        await User.create({
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
        const {login, password} = req.body;
        }catch(e){
            console.log(e);
            res.status(400).json({message:"Login error"});
        }
    }
    async getUsers(req,res){
        try{
            res.json("server work right");
        }catch(e){
            console.log(e);
            
        }
    }
}
export {AuthController}