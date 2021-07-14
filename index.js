import express from 'express'
import {PORT} from './settings.js'
import { authController } from './app/controllers/authController.js'
import { runController } from './app/controllers/runController.js'
const app = express();
app.use(express.json());

authController(app);
runController(app);

const start = () => {
    try{

        app.listen(PORT, ()=> console.log(`Server is started on port: ${PORT}`));
    }catch(e){
        console.log(e);
    }
}
start();






    
    