import sequelize from 'sequelize';
import dbInstance from './dbInstance.js'
const Run = dbInstance.define("run",{
    id:{
    type: sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
    },
    user_id:{
    type: sequelize.INTEGER,
    allowNull:false
  },
  distance:{
    type: sequelize.FLOAT,
    allowNull:false
    },
    time:{
    type: sequelize.STRING,
    allowNull:false    
  },
  date:{
    type: sequelize.STRING,
    allowNull:false    
    }
});

dbInstance.sync().then(result=>console.log(result))
.catch(err=>console.log(err));

export {Run};
