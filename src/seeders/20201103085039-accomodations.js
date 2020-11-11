module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accomodations', [{
      id: 1,
      name: 'one&only',
      description: 'fie starts hotel ',
      location_id: 1,
      image: 'assets/images',
      amenities: ['wifi', 'parking', 'printry'],
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accomodations', null, {});
  },
};
