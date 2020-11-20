module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accomodations', [{
      name: 'one&only',
      description: 'five starts hotel located in nyungwe ',
      location_id: 1,
      image: 'assets/images',
      amenities: ['wifi', 'parking', 'printry'],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Selena Hotel',
      description: 'Hotel located in kigali',
      location_id: 1,
      image: 'assets/images',
      amenities: ['wifi', 'parking', 'printry', 'water view'],
      createdAt: new Date(),
      updatedAt: new Date(),
    }], { });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accomodations', null, {});
  },
};
