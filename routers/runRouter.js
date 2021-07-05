import express from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {isNumber,timeFormat} from '../middlewares/runMiddleware.js'
import { RunController } from '../controllers/runController.js';
const runRouter = new express.Router();
const controller = new RunController();
runRouter.route('/').all(authMiddleware)
.post([isNumber,timeFormat],controller.postRun)
.get(controller.getRuns)
.put((req,res)=>{
    res.status(200).json({message:"Run put"});
})
.delete((req,res)=>{
    res.status(200).json({message:"Run delete"});
});
runRouter.get('/report',(req,res)=>{
    res.status(200).json({message:"Week Report"});
});
export {runRouter};