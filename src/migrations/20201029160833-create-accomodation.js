module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accomodations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      location_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      cost: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      owner: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      availableRooms: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Accomodations');
  }
};