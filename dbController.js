import sequelize from 'sequelize';
import {dbName,dbUser,dbPass} from './settings.js'


    const seque = new sequelize(dbName, dbUser, dbPass, {
        dialect: "postgres",
        define:{
            timestamps: false
        }
  });
  
  const User = seque.define("user",{
      id:{
      type: sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
      },
      login:{
      type: sequelize.STRING,
      allowNull:false
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
  const Run = seque.define("run",{
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
  seque.sync().then(result=>console.log(result))
  .catch(err=>console.log(err));
  seque.sync().then(result=>console.log(result))
  .catch(err=>console.log(err));
  
  User.hasMany(Run);
  Run.belongsTo(User);

export {User,Run}


  // User.create({
  //     login: "Tomy",
  //     password: "12345",
  //     reg_date:  Date().toString(),
  //     photo: "photo"
  //   }).then(res=>{
  //     console.log(res);
  //   }).catch(err=>console.log(err));
  