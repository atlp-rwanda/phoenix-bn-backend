'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permission', [{
      id: 1,
      name: 'view_travel_requests',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 2,
      name: 'edit_travel_requests',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 3,
      name: 'create_travel_requests',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 4,
      name: 'cancel_travel_requests',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 5,
      name: 'edit_profile',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 6,
      name: 'book_accomodations',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 7,
      name: 'view_direct_reports_travel_requests',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 8,
      name: 'reject_direct_reports_travel_requests',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 9,
      name: 'approve_direct_reports_travel_requests',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 10,
      name: 'assign_requesters_to_manager',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 11,
      name: 'create_accomodations',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 12,
      name: 'delete_accomodations',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 13,
      name: 'update_accomodations',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 14,
      name: 'create_locations',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 15,
      name: 'update_locations',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('Permission', [{
      id: 16,
      name: 'delete_locations',
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
  }
};
