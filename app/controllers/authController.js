import validator from 'express-validator';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {login} from '../cores/auth/login.js';
import { registration } from '../cores/registration/registration.js';
import { getUsers } from '../cores/user/getUsers.js';
import { respond } from '../middlewares/respond.js';
export const authController = async function(app){
    
app.route('/api/v1/registration')
.all(validator.check('login','Имя пользователя не может быть пустым').notEmpty(),
     validator.check('password','Пароль должен быть больше 4 и меньше 10 символов').isLength({min:4,max:10}))
.post((req,res)=>
    respond(res,200,registration(req)));

app.route('/api/v1/login')
.post((req,res)=>
    respond(res,200,login(req.body)));

app.route('/api/v1/users')
.all(authMiddleware)
.get((req,res)=>
    respond(res,200,getUsers()));


}
