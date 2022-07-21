/* eslint-disable no-unused-vars */
require('dotenv').config();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 0;');
    await queryInterface.bulkInsert('Users', [
      {
        id: 0,
        name: process.env.MYSQL_DEV_USER,
        email: process.env.MYSQL_DEV_USER,
        password: process.env.MYSQL_DEV_PASSWORD,
        isRoot: true,
        funds: '1000000000000',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        name: 'Leandro Teixeira',
        email: 'leandroteixeira3@gmail.com',
        password: 'kjkszpj',
        isRoot: false,
        funds: '5000',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
