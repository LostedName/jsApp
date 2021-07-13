import bcrypt from 'bcrypt'
import {generateToken} from '../../services/jwt.js'
import db from '../../services/db.js';
export const login = async function(req,res){
    try{
    const models = db.getModels();
    const {login, password} = req.body;
    const {id,password:dbPassword} = await models.User.findOne({where: {login}});
    if (!id){
       return res.status(400).json({message:"Пользователь с таким именем не зарегистрирован"});
    }
    if (!await bcrypt.compare(password,dbPassword))
    return res.status(400).json({message:"Неверный пароль"});    

    const token = generateToken(id);
    res.status(200).json({token});    

}catch(e){
        console.log(e);
    }
}