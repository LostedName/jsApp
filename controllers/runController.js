import {Run} from '../dbModels.js'
class RunController{
    async postRun(req,res){
        try{

            const {distance,time} = req.body;
            const dateParts = new Date().toString().split(" ");
            const date = `${dateParts[0]} ${dateParts[1]} ${dateParts[2]} ${dateParts[3]}`;        
            await Run.create({
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
    async getAllRuns(req,res){
      try{
          const user_id = req.user.id;
          const runs = await Run.findAll({where:{user_id}});
          res.status(200).json({message:runs});
        }catch(e){
            console.log(e);
          res.status(500).json({message:"При работе сервера возникли неполадки"});

        }
    }
    async putRun(req,res){
        try{
            res.status(200).json({message:"Изменение произошло успешно"});

        }catch(e){

        console.log(e);
        res.status(400).json({message:"Произошла ошибка"});
        }
    }
    async deleteRun(req,res){
        try{
            const {id} = req.body;
            const findRun = await Run.findOne({where:{id}});
            if (!findRun){
            return res.status(400).json({message:`Пробежки с id = ${id} не существует`});
            }
            await Run.destroy({where:{id}});
            res.status(200).json({message:"Удаление произошло успешно"});
        }catch(e){
            console.log(e);
            res.status(400).json({message:"Произошла ошибка"});
        }
    }
}

export {RunController};