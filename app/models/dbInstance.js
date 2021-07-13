import sequelize from 'sequelize';
import {dbName,dbUser,dbPass} from '../../settings.js'


    const seque = new sequelize(dbName, dbUser, dbPass, {
        dialect: "postgres",
        define:{
            timestamps: false
        }
  });

  export default seque;