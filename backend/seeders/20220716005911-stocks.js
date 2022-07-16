/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stocks', null, {});
    await queryInterface.sequelize.query('ALTER TABLE Stocks AUTO_INCREMENT = 1;');

    const stocks = [];

    for (let i = 1; i < 5; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        stocks.push({
          owner_Id: 0,
          company_Id: i,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      }
    }

    await queryInterface.bulkInsert('Stocks', stocks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stocks', null, {});
  },
};
