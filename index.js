import express from 'express'
import {PORT} from './settings.js'
import {User,Run} from './dbController.js'
import bcrypt from 'bcrypt'
const app = express();
app.use(express.json());
app.listen(PORT, ()=> console.log(`Server is started on port: ${PORT}`));

app.post('/users',async (req,res)=>{
    let {login,password,photo} = req.body;
    let reg_date = new Date().toString();
    try{
        password = await bcrypt.hash(password, 10);
        User.create({
            login,
            password,
            reg_date,
            photo
        }).then(responce=>{
            console.log(responce);
            res.status(200).send("Success.");
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).send("An error is occured. Try later.");
        });
    }
    catch{
    }
});




    
    