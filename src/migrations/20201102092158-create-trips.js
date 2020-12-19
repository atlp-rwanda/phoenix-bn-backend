import moment from 'moment';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      origin: {
        type: Sequelize.STRING,
      },
      destination: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      travelDate: {
        type: Sequelize.DATE,
      },
      returnDate: {
        type: Sequelize.DATE,
      },
      reason: {
        type: Sequelize.STRING,
      },
      accomodation_id: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      line_manager: {
        type: Sequelize.INTEGER,
      },
      status: {
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
    await queryInterface.dropTable('trips');
  },
};
