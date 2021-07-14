import express from 'express';
import validator from 'express-validator';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {login} from '../cores/auth/login.js';
import { registration } from '../cores/registration/registration.js';
import { getUsers } from '../cores/user/getUsers.js';

export const authController = async function(app){
    
app.route('/api/v1/registration')
.all(validator.check('login','Имя пользователя не может быть пустым').notEmpty(),
     validator.check('password','Пароль должен быть больше 4 и меньше 10 символов').isLength({min:4,max:10}))
.post(registration);

app.route('/api/v1/login')
.post(login);

app.route('/api/v1/users')
.all(authMiddleware)
.get(getUsers);


}
