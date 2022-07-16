const Stock = (sequelize, DataTypes) => {
  const stock = sequelize.define('Stock', {
    ownerId: {
      type: DataTypes.NUMBER,
      defaultValue: 1,
      field: 'owner_id',
    },
    companyId: {
      type: DataTypes.NUMBER,
      field: 'company_id',
    },
  });

  Stock.associate = (models) => {
    Stock.belongsTo(
      models.User,
      { foreignKey: 'owner_id', as: 'owner' },
    );
  };

  Stock.associate = (models) => {
    Stock.belongsTo(
      models.Company,
      { foreignKey: 'company_id', as: 'company' },
    );
  };
  return stock;
};

module.exports = Stock;
