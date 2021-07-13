import express from 'express'
import db from '../services/db.js'
import bcrypt from 'bcrypt'

const router = express.Router();
router.post('/test',async (req,res)=>{
   // return   res.status(200).json({message:"Привет тестовый пост запрос."});
    const {login,password:pass,photo} = req.body;
    const password = await bcrypt.hash(pass, 10);
    const reg_date = new Date().toLocaleDateString();
    const models = db.getModels();
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
})
export default router;