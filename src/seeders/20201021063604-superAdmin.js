import 'dotenv/config';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // await queryInterface.bulkInsert('Users', [{
    //   email: 'nomadbarefoot2@gmail.com',
    //   password: '$2y$10$h9uUt4416J.4arbHJ0VMBegFPOVng0ALRok1JKEHMuugwkLWAey8e',
    //   RoleId: 1,
    //   isVerified: true,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }], {});
    await queryInterface.bulkInsert('Users', [{
      email: 'barefoot@gmail.com',
      password: '$2b$10$GBZgVGM5YDiE2JmhzBWxQuhTARsPQURZFQ7Y0.MsR5M6mqR.EzQ8u',
      RoleId: 1,
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
