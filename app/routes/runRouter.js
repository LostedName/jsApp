import express from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import * as runMidlleware from '../middlewares/runMiddleware.js'
import { getReport } from '../cores/user/getReport.js';
import { deleteRun } from '../cores/user/deleteRun.js';
import { putRun } from '../cores/user/putRun.js';
import { getRun } from '../cores/user/getRun.js';
import { postRun } from '../cores/user/postRun.js';
const runRouter = new express.Router();
runRouter.route('/').all(authMiddleware)
.post([runMidlleware.isNumber,runMidlleware.timeFormat], postRun)
.get(getRun)
.put([runMidlleware.putDataVerify,runMidlleware.isNumber,runMidlleware.timeFormat,runMidlleware.dateFormat],putRun)
.delete(deleteRun);
runRouter.get('/report',authMiddleware, getReport);
export {runRouter};