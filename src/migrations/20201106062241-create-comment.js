import moment from 'moment';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      request_id: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        get: () => moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        get: () => moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  },
};
