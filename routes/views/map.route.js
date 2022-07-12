const router = require('express').Router();
const { Bar, Photo } = require('../../db/models');

router.route('/').get((req, res) => {
  res.render('main/map');
});

// Передаем адреса всех ресторанов на клиент map.js
router.route('/show').get(async (req, res) => {
  const bars = await Bar.findAll({ raw: true });
  const photos = await Photo.findAll({ raw: true });

  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < photos.length; j++) {
      if (bars[i].id === photos[j].bar_id) {
        bars[i].bar_photo_name = photos[j].photo_name;
      }
    }
  }

  res.json(bars);
});

// Проложить маршрут
router.route('/route/:bar_id').get((req, res) => {
  res.send('В разработке...');
});

module.exports = router;
