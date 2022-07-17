const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    isRoot: DataTypes.BOOLEAN,
    risk: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    funds: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  });

  user.associate = (models) => {
    user.hasMany(
      models.Stock,
      { foreignKey: 'owner_id', as: 'users' },
    );
  };
  return user;
};

module.exports = User;
