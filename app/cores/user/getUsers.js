import db from '../../services/db.js';
export const getUsers = async function(){
    try{
        const models = db.getModels();
        const users = await models.User.findAll();
        return users;
    }catch(e){
        console.log(e);
        return {message:"Ошибка при получении данных"};
    }
}
