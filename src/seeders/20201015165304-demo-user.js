/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    id: 1,
    fullName: 'Nishimwe Elysee',
    userName: 'elysee',
    password: 'elysee123',
    email: 'nishimwelys@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: 2,
    fullName: 'Ukundimana Faustin',
    userName: 'faustin',
    password: 'faustin123',
    email: 'fukundimana@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
