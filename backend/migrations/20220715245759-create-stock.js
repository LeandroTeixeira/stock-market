/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET DEFAULT',
        defaultValue: 1,
        field: 'owner_id',
        // Informa que o campo é uma Foreign Key (Chave estrangeira)
        references: {
          // Informa a tabela da referência da associação
          model: 'Users',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'company_id',
        // Informa que o campo é uma Foreign Key (Chave estrangeira)
        references: {
          // Informa a tabela da referência da associação
          model: 'Companies',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stocks');
  },
};
