import express from 'express'
import {PORT} from './settings.js'
import {User,Run} from './dbModels.js'
import {router} from './authRouter.js'
import {runRouter} from './runRouter.js'
const app = express();
app.use(express.json());
app.use('/auth',router);
app.use('/run',runRouter);
const start = () => {
    try{
        app.listen(PORT, ()=> console.log(`Server is started on port: ${PORT}`));
    }catch(e){
        console.log(e);
    }
}
start();





    
    