import express from 'express'
import {PORT} from './settings.js'
import {User,Run} from './dbController.js'
import bcrypt from 'bcrypt'
const app = express();
app.use(express.json());
app.listen(PORT, ()=> console.log(`Server is started on port: ${PORT}`));

app.post('/users',async (req,res)=>{
    let status = false;
    console.log("Status before" + status);
    status = await CreateUser(req.body);
    console.log("Status after" + status);
    if (status == true){
        res.status(200).send("Success.");
    }
    else{
        res.status(500).send("An error is occured. Try later.");
    }
});

async function CreateUser({login,password,photo}){
    let reg_date = new Date().toString();
    let isErrOccur = false;
    try{
        password = await bcrypt.hash(password, 10);
        User.create({
            login,
            password,
            reg_date,
            photo
        }).then(res=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
            console.log("KABOOOOOOOOOOOOOOO");
            isErrOccur = true;
        });
    }
    catch{
        isErrOccur = true;
    }
    console.log("Is error occur" + isErrOccur);
    return (isErrOccur == true) ? false : true;
}


    
    