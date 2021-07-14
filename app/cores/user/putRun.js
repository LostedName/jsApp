import db from '../../services/db.js'
export const putRun = async function({id,distance,time,date}){
    try{
        const models = db.getModels();
        await models.Run.update({distance,time,date},{where:{id}});
        return {message:"Пробежка была успешно изменена"};
    }catch(e){

    console.log(e);
    return {message:"Произошла ошибка"};
    }
}