import db from '../services/db.js'
class RunController{
    async postRun(req,res){
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
    async getRun(req,res){
      try{
        const models = db.getModels();

          const user_id = req.user.id;
          const {id} = req.body;
          let runs;
          if (id){
            runs = await models.Run.findOne({where:{user_id,id}});
            }
          else{
            runs = await models.Run.findAll({where:{user_id}});
            }
          res.status(200).json(runs);
        }catch(e){
            console.log(e);
          res.status(500).json({message:"При работе сервера возникли неполадки"});

        }
    }
    async putRun(req,res){
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
    async deleteRun(req,res){
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
    async runReport(req,res){
        try{
            const models = db.getModels();

            const user_id = req.user.id;
            let runs = await models.Run.findAll({where:{user_id}});
            runs.sort(function(obj1,obj2){
            const date1 = new Date(obj1.date);
            const date2 = new Date(obj2.date);
            return date1-date2;
            });
            const runDates = [];//массив отдельных дат, выбранных с объектов массива runs
            for(let i = 0;i<runs.length;i++){
                runDates.push(new Date(reverseDateStr(runs[i].date)));
            }

            const startDate = new Date(reverseDateStr(runs[0].date));//минимальная дата
            const endDate = new Date(reverseDateStr(runs[runs.length - 1].date));//максимальная дата
            const dateDifference = dateDiff(startDate,endDate);//разница в днях между min и max

            const weekCount = Math.ceil(dateDifference/7);//Количество недель
            const weekReports = []; //Массив отчётов по неделям
            let weekStartPoint = startDate;
            let weekEndPoint =  dateAdd(startDate,7);

            for(let i = 0;i<weekCount;i++){
                let runDays = 0;
                let totalDistance = 0;
                let totalTime = 0;
                for(let j = 0;j<runDates.length;j++){
                    if (runDates[j] >= weekStartPoint && runDates[j]<= weekEndPoint){
                        runDays++;
                        totalDistance += runs[j].distance;
                        totalTime += timeSlice(runs[j].time);
                        runs.splice(j,1);
                        runDates.splice(j,1);
                        j--;
                    }
                }
                weekReports.push({
                    Week:`${i + 1}: ${weekStartPoint.toLocaleDateString()} / ${weekEndPoint.toLocaleDateString()}`,
                    AvSpeed: totalDistance/1000/totalTime, // km. per h.
                    AvTime: totalTime/runDays, // h.
                    TotalDistance: totalDistance/1000 // km.
                });
                weekStartPoint = dateAdd(weekEndPoint,1);
                weekEndPoint = dateAdd(weekEndPoint,8);
            }
            res.status(200).json({weekReports});
        }catch(e){
            console.log(e);
            res.status(500).json({message:"Произошла ошибка"});
        }
    }
}
function reverseDateStr(date){
    return date.replace(/([0-9]{2})([.])([0-9]{2})([.][0-9]{4})/,'$3$2$1$4');
}

//Добавление к дате определённое количество дней
function dateAdd(date,daysCount){
    const dayMillSec = (24*3600*1000);
    const newDate = new Date(date.getTime() + dayMillSec * daysCount);
    return newDate;
}
//Получает разницу между датами в днях
function dateDiff(startDate,endDate){
    const dayMillSec = (24*3600*1000);
    return (endDate.getTime() - startDate.getTime())/dayMillSec;
}

function timeSlice(time){
    const timeParts = time.split(':');
    const h = parseInt(timeParts[0]);
    const m = parseInt(timeParts[1]);
    const s = parseInt(timeParts[2]);
    return h + m/60 + s/3600;
}

export {RunController};