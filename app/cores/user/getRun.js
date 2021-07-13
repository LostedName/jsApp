import db from '../../services/db.js';
export const getRun = async function(req,res){
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
