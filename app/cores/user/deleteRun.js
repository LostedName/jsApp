import db from '../../services/db.js'
export const deleteRun = async function(req){
    try{
        const models = db.getModels();

        const {id} = req.body;
        const findRun = await models.Run.findOne({where:{id}});
        if (!findRun){
        return {message:`Пробежки с id = ${id} не существует`};
        }
        await models.Run.destroy({where:{id}});
        return {message:"Удаление произошло успешно"};
    }catch(e){
        console.log(e);
        return {message:"Произошла ошибка"};
    }
}