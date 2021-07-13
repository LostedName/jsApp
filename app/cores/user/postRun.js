import db from '../../services/db.js'
export const postRun = async function(req,res){
    try{
        const models = db.getModels();
        const {distance,time} = req.body;
        const date = new Date().toLocaleDateString();
        await models.Run.create({
            user_id:req.user.id,
            distance,
            time,
            date
        }).then((response)=>{
            res.status(200).json({message:"Пробежка успешно добавлена."});
        }).catch((err)=>{
            res.status(200).json({message:"Возникли проблемы при добавлении записи."});
        });
    }catch(e){
    console.log(e);
    res.status(400).json("Run add error");
    }
}