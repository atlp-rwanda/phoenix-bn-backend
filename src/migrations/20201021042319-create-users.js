module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      RoleId: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      officeAddres: {
        type: Sequelize.STRING,
      },
      preferedLanguage: {
        type: Sequelize.STRING,
      },
      lineManager: {
        type: Sequelize.INTEGER,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      socialId: {
        type: Sequelize.STRING,
      },
      provider: {
        type: Sequelize.STRING,
      },
      authToken: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
