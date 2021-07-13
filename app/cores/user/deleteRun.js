import db from '../../services/db.js'
export const deleteRun = async function(req,res){
    try{
        const models = db.getModels();

        const {id} = req.body;
        const findRun = await models.Run.findOne({where:{id}});
        if (!findRun){
        return res.status(400).json({message:`Пробежки с id = ${id} не существует`});
        }
        await models.Run.destroy({where:{id}});
        res.status(200).json({message:"Удаление произошло успешно"});
    }catch(e){
        console.log(e);
        res.status(400).json({message:"Произошла ошибка"});
    }
}