import db from '../../services/db.js'
export const postRun = async function(req){
    try{
        const models = db.getModels();
        const {distance,time} = req.body;
        const date = new Date().toLocaleDateString();
        await models.Run.create({
            user_id:req.user.id,
            distance,
            time,
            date
        });
        return {message:"Пробежка успешно добавлена."};
    }catch(e){
    console.log(e);
    return {message:"Run add error"};
    }
}