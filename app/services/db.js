import {User} from '../models/user.js';
import {Run} from '../models/run.js';
User.hasMany(Run);
Run.belongsTo(User);
const db = {};
db.getModels = function(){return {User,Run}};
export default db;