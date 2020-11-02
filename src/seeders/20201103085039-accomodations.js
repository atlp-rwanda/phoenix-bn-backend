module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accomodations', [{
      id: 1,
      name: 'one&only',
      description: 'fie starts hotel ',
      location: 'Nyamasheke',
      cost: 2500,
      owner: 'owner',
      status: 'status',
      user_id: 3,
      availableRooms: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accomodations', null, {});
  },
};
