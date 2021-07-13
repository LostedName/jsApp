import express from 'express'
import validator from 'express-validator'
import {authMiddleware} from '../middlewares/authMiddleware.js'
import {login} from '../cores/auth/login.js'
import { registration } from '../cores/registration/registration.js';
import { getUsers } from '../cores/user/getUsers.js';
const {check} = validator;
const router = express.Router();
router.post('/registration',[
    check('login','Имя пользователя не может быть пустым').notEmpty(),
    check('password','Пароль должен быть больше 4 и меньше 10 символов').isLength({min:4,max:10})    
],registration);
router.post('/login',login);
router.get('/users',authMiddleware, getUsers);

export {router}