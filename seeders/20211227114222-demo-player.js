'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('players', [{
      name: 'Ilham',
      game: 'Dota 2',
      win: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Riandy',
      game: 'Mobile Legends',
      win: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('players', null, {})
  }
};
