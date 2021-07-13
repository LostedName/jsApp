import db from '../../services/db.js';
export const getUsers = async function(req,res){
    try{
        const models = db.getModels();
        const users = await models.User.findAll();
        console.log(req.user.id);
        res.status(200).json(users);
    }catch(e){
        console.log(e);
        
    }
}
