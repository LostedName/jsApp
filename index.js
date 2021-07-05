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
app.use('/users',debug);
app.route('/').all(auth)
.get((req,res)=>{
    res.send("You use Get");
})
.post((req,res)=>{
    res.send("You use Post");
});
app.post('/users',(req,res)=>{
    res.send("You use Post users");
});
function auth(req,res,next){
    next();
    console.log("auth");
}
function log(req,res,next){
console.log("log");
    next();
}
function debug(req,res,next){
    console.log("debug");
    next('route');
    console.log("NEXT DEBUG");
    }
app.listen(PORT, ()=> console.log(`Server is started on port: ${PORT}`));