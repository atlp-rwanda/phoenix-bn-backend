import moment from 'moment';

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
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      location_id: {
        type: Sequelize.INTEGER,
      },
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      image: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      roomsLeft: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      averageRating: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
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
    await queryInterface.dropTable('Accomodations');
  },
};
