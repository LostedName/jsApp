import {User} from '../models/user.js';
import {Run} from '../models/run.js';
const db = {};
db.getModels = ()=>{User,Run};
export default db;