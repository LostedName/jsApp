import express from 'express'
import {PORT} from './settings.js'
import {router} from './app/routes/authRouter.js'
import {runRouter} from './app/routes/runRouter.js'
import testRouter from './app/routes/testRoute.js'


const app = express();
app.use(express.json());
app.use('/auth',router);
app.use('/run',runRouter);
app.use('/app',testRouter);
const start = () => {
    try{

        app.listen(PORT, ()=> console.log(`Server is started on port: ${PORT}`));
    }catch(e){
        console.log(e);
    }
}
start();





    
    