module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'barefoot@gmail.com',
      password: '$2b$10$GBZgVGM5YDiE2JmhzBWxQuhTARsPQURZFQ7Y0.MsR5M6mqR.EzQ8u',
      RoleId: 1,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Iradukunda',
      lastName: 'Japhet',
      email: 'requester@barefoot.com',
      password: '$2b$10$GBZgVGM5YDiE2JmhzBWxQuhTARsPQURZFQ7Y0.MsR5M6mqR.EzQ8u',
      RoleId: 5,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Ingabire',
      lastName: 'Josee',
      email: 'manager@barefoot.com',
      password: '$2b$10$GBZgVGM5YDiE2JmhzBWxQuhTARsPQURZFQ7Y0.MsR5M6mqR.EzQ8u',
      RoleId: 3,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Kwizera',
      lastName: 'Bryan',
      email: 'linemanager@barefoot.com',
      password: '$2b$10$GBZgVGM5YDiE2JmhzBWxQuhTARsPQURZFQ7Y0.MsR5M6mqR.EzQ8u',
      RoleId: 4,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'UWIMANA Benithe',
      lastName: 'Bryan',
      email: 'travelAdmin@barefoot.com',
      password: '$2b$10$GBZgVGM5YDiE2JmhzBWxQuhTARsPQURZFQ7Y0.MsR5M6mqR.EzQ8u',
      RoleId: 2,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
