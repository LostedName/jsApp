import {authMiddleware} from '../middlewares/authMiddleware.js';
import * as runMidlleware from '../middlewares/runMiddleware.js'
import { getReport } from '../cores/user/getReport.js';
import { deleteRun } from '../cores/user/deleteRun.js';
import { putRun } from '../cores/user/putRun.js';
import { getRun } from '../cores/user/getRun.js';
import { postRun } from '../cores/user/postRun.js';
import { respond } from '../middlewares/respond.js';

export const runController = async function(app){

app.route('/api/v1/run')
.all(authMiddleware)
.post([runMidlleware.isNumber,runMidlleware.timeFormat],
    (req,res)=>respond(res,200,postRun(req)))
.get(
    (req,res)=>respond(res,200,getRun(req)))
.put([runMidlleware.putDataVerify,runMidlleware.isNumber,runMidlleware.timeFormat,runMidlleware.dateFormat],
    (req,res)=>respond(res,200,putRun(req.body)))
.delete(
    (req,res)=>respond(res,200,deleteRun(req)));

app.route('/api/v1/report')
.all(authMiddleware)
.get((req,res)=>respond(res,200,getReport(req)));

}
