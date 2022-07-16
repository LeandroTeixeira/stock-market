const Stock = (sequelize, DataTypes) => {
  const stock = sequelize.define('Stock', {
    ownerId: {
      type: DataTypes.NUMBER,
      defaultValue: 1,
    },
    companyId: DataTypes.NUMBER,
  });

  Stock.associate = (models) => {
    Stock.belongsTo(
      models.User,
      { foreignKey: 'ownerId', as: 'owner' },
    );
  };

  Stock.associate = (models) => {
    Stock.belongsTo(
      models.Company,
      { foreignKey: 'companyId', as: 'company' },
    );
  };
  return stock;
};

module.exports = Stock;
