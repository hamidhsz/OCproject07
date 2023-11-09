const bcrypt = require('bcrypt');




module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
  
      password: DataTypes.STRING
  
    }, {
  
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
  
    });
  
    return User;
  
  };
