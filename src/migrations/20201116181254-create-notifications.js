import moment from 'moment';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      receiver: {
        type: Sequelize.INTEGER,
      },
      tripId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      isRead: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      message: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('notifications');
  },
};
