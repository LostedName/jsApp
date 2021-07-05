
import {Run} from '../dbModels.js'
function isNumber(req,res,next){
    const {distance} = req.body;
    if(isNaN(distance)){
        return res.status(400).json({message:"Дистанция должна быть целым или дробным числом"});
    }
    next();
}
function timeFormat(req,res,next){
    const {time} = req.body;
    const regex = /^[0-9]+:[0-9]{1,2}:[0-9]{1,2}$/;
    if (!regex.test(time))
    {
        return res.status(400).json({message:"Не правильный формат времени(hh:mm:ss)"});
    }
    next();
}

async function putDataVerify(req,res,next){
    try{

        let {id,distance,time,date} = req.body;
        if (!id){
            return res.status(400).json({message:"id пробежки не указан"});
        }
        if (!distance && !time && !date){
        return res.status(400).json({message:"Не указаны данные для изменения"});
        }
        const findRun = await Run.findOne({where:{id}});
            if (!findRun){
                return res.status(400).json({message:`Пробежки с id = ${id} не существует`});
            }
            if (!distance)
            distance = findRun.distance;
            if (!time)
            time = findRun.time;
            if (!date)
            date = findRun.date;
            req.body = {id,distance,time,date};
    next();
}catch(e){
    console.log(e);
    return res.status(400).json({message:"Произошла ошибка"});
}

}
export {isNumber,timeFormat, putDataVerify};