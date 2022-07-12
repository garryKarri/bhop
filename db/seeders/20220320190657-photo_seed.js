'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [
      {
        photo_name: 'астер.png',
        bar_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'берч.png',
        bar_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'бобо.png',
        bar_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'коммонс.png',
        bar_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'редрум.png',
        bar_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'смена.png',
        bar_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'тальятелла.png',
        bar_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'утопист.png',
        bar_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'фильтр.png',
        bar_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'харвест.png',
        bar_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'цветочки.png',
        bar_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_name: 'цивил.png',
        bar_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Photos', null, {})
  }
};
