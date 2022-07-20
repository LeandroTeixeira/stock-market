/* eslint-disable no-unused-vars */
const { COMPANY_LIST } = require('../src/model/companies.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
    await queryInterface.sequelize.query('ALTER TABLE Companies AUTO_INCREMENT = 1;');

    const data = COMPANY_LIST.map((company) => ({
      name: company.name,
      fullName: company.fullName,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    }));
    await queryInterface.bulkInsert('Companies', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
  },
};
