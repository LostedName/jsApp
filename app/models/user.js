import sequelize from 'sequelize';
import dbInstance from './dbInstance.js'
const User = dbInstance.define("user",{
    id:{
    type: sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
    },
    login:{
    type: sequelize.STRING,
    allowNull:false,
    unique: true
    },
    password:{
    type: sequelize.STRING,
    allowNull:false
    },
    reg_date:{
        type: sequelize.STRING,
    allowNull:false,
  },
  photo:{
      type: sequelize.STRING,
      allowNull:false 
  }
});
dbInstance.sync().then(result=>console.log(result))
.catch(err=>console.log(err));

export {User};