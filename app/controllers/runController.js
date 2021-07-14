import {authMiddleware} from '../middlewares/authMiddleware.js';
import * as runMidlleware from '../middlewares/runMiddleware.js'
import { getReport } from '../cores/user/getReport.js';
import { deleteRun } from '../cores/user/deleteRun.js';
import { putRun } from '../cores/user/putRun.js';
import { getRun } from '../cores/user/getRun.js';
import { postRun } from '../cores/user/postRun.js';

export const runController = async function(app){

app.route('/api/v1/run')
.all(authMiddleware)
.post([runMidlleware.isNumber,runMidlleware.timeFormat], postRun)
.get(getRun)
.put([runMidlleware.putDataVerify,runMidlleware.isNumber,runMidlleware.timeFormat,runMidlleware.dateFormat],putRun)
.delete(deleteRun);

app.route('/api/v1/report')
.all(authMiddleware)
.get(getReport);

}
