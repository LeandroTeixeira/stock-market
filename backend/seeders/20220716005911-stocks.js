const { COMPANY_LIST } = require('../src/model/companies.model');

/* eslint-disable no-unused-vars */
require('dotenv').config();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stocks', null, {});
    await queryInterface.sequelize.query('ALTER TABLE Stocks AUTO_INCREMENT = 1;');

    const stocks = [];
    if (process.env.NODE_ENV === 'test') {
      for (let i = 1; i < 24; i += 1) {
        for (let j = 0; j < i; j += 1) {
          stocks.push({
            company_id: i,
            owner_id: (j < Math.floor(i / 2)) ? 1 : 2,
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          });
        }
      }
    } else {
      for (let i = 1; i < COMPANY_LIST.length; i += 1) {
        const max = Math.floor(Math.random() * (991)) + 10;

        for (let j = 0; j < max; j += 1) {
          stocks.push({
            company_Id: i,
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          });
        }
      }
    }

    await queryInterface.bulkInsert('Stocks', stocks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stocks', null, {});
  },
};
