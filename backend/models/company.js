const Company = (sequelize, DataTypes) => {
  const company = sequelize.define('Company', {
    name: DataTypes.STRING,
    fullName: DataTypes.STRING,
  });
  company.associate = (models) => {
    company.hasMany(
      models.Stock,
      { foreignKey: 'companyId', as: 'companies' },
    );
  };
  return company;
};

module.exports = Company;
