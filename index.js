import express from 'express'
import {PORT} from './settings.js'
import {User,Run} from './dbController.js'
const app = express();
app.use(express.json());
// User.create({
//         login: "Tomy",
//         password: "12345",
//         reg_date:  Date().toString(),
//         photo: "photo"
//       }).then(res=>{
//         console.log(res);
//       }).catch(err=>console.log(err));
// app.route('/')
// .get((req,res)=>{})
// .post((req,res)=>{});
app.use(auth);
app.get('/',(req,res)=>{
    res.send("You use Get");
});
app.post('/',log,log,log,log,auth,(req,res)=>{
    res.send("You use Post");
});
function auth(req,res,next){
    console.log("auth");
    next();
}
function log(req,res,next){
console.log("log");
    next();
}
app.listen(PORT, ()=> console.log(`Server is started on port: ${PORT}`));