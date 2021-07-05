import express from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import * as runMidlleware from '../middlewares/runMiddleware.js'
import { RunController } from '../controllers/runController.js';
const runRouter = new express.Router();
const controller = new RunController();
runRouter.route('/').all(authMiddleware)
.post([runMidlleware.isNumber,runMidlleware.timeFormat],controller.postRun)
.get(controller.getAllRuns)
.put([runMidlleware.putDataVerify,runMidlleware.isNumber,runMidlleware.timeFormat],controller.putRun)
.delete(controller.deleteRun);
runRouter.get('/report',(req,res)=>{
    res.status(200).json({message:"Week Report"});
});
export {runRouter};