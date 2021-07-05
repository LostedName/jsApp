import express from 'express'
import { AuthController } from '../controllers/authController.js';
import validator from 'express-validator'
import {authMiddleware} from '../middlewares/authMiddleware.js'
const {check} = validator;
const controller = new AuthController();
const router = express.Router();
router.post('/registration',[
    check('login','Имя пользователя не может быть пустым').notEmpty(),
    check('password','Пароль должен быть больше 4 и меньше 10 символов').isLength({min:4,max:10})    
],controller.registration);
router.post('/login',controller.login);
router.get('/users',authMiddleware,controller.getUsers);

export {router}