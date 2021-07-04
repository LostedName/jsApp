import express from 'express'
import {PORT} from './settings.js'
import {User,Run} from './dbController.js'
const app = express();
app.use(express.json());
User.create({
        login: "Tomy",
        password: "12345",
        reg_date:  Date().toString(),
        photo: "photo"
      }).then(res=>{
        console.log(res);
      }).catch(err=>console.log(err));
app.route('/')
.get((req,res)=>{})
.post((req,res)=>{});
app.listen(PORT, ()=> console.log(`Server is started on port: ${PORT}`));