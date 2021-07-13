import express from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import * as runMidlleware from '../../middlewares/runMiddleware.js'
import { RunController } from '../controllers/runController.js';
const runRouter = new express.Router();
const controller = new RunController();
runRouter.route('/').all(authMiddleware)
.post([runMidlleware.isNumber,runMidlleware.timeFormat],controller.postRun)
.get(controller.getRun)
.put([runMidlleware.putDataVerify,runMidlleware.isNumber,runMidlleware.timeFormat,runMidlleware.dateFormat],controller.putRun)
.delete(controller.deleteRun);
runRouter.get('/report',authMiddleware,controller.runReport);
export {runRouter};