import db from '../../services/db.js'
export const putRun = async function(req,res){
    try{
        const models = db.getModels();
        const {id,distance,time,date} = req.body;
        await models.Run.update({distance,time,date},{where:{id}});
        res.status(200).json({message:"Пробежка была успешно изменена"});

    }catch(e){

    console.log(e);
    res.status(400).json({message:"Произошла ошибка"});
    }
}