const router = require('express').Router();
const profileCheck = require('../../middlewares/profileCheck')
const { Bar, Photo, Favorite } = require('../../db/models');

router.route('/').get(async (req, res) => {
  const bars = await Bar.findAll({ raw: true });
  const photos = await Photo.findAll({ raw: true });

  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < photos.length; j++) {
      if (bars[i].id === photos[j].bar_id) {
        bars[i].bar_photo_name = photos[j].photo_name;
      }
    }
  }

  res.render('main/main', { bars });
});

// Добавить в избранное
router.route('/main/favorite/:bar_id').get(async (req, res) => {
  if (req.session.user_data) {
    const { bar_id } = req.params;
    const user_id = req.session.user_data.id;

    const data = await Favorite.findAll({ where: { bar_id }, raw: true });

    let users_id = data.map(el => el = el.user_id)

    if (data && users_id.includes(user_id)) {
      res.render('main/confirmFavorite', {
        layout: false,
        check: false,
        message: `Уже есть в избранном`,
      });
    } else {
      await Favorite.create({ user_id, bar_id });
      const bar = await Bar.findByPk(bar_id, { raw: true });

      res.render('main/confirmFavorite', {
        layout: false,
        check: true,
        bar,
      });
    }
  } else {
    res.render('main/confirmFavorite', {
      layout: false,
      check: false,
      message: 'Чтобы добавить в избранное - авторизуйтесь!',
    });
  }
});

// Сортировка
router.route('/main/drop').post(async (req, res) => {
  const { type } = req.body;
  let bar_type = '';

  const photos = await Photo.findAll({ raw: true });

  if (type.includes('Все')) {
    const bars = await Bar.findAll({ raw: true })

    for (let i = 0; i < bars.length; i++) {
      for (let j = 0; j < photos.length; j++) {
        if (bars[i].id === photos[j].bar_id) {
          bars[i].bar_photo_name = photos[j].photo_name;
        }
      }
    }
  
    res.render('main/mainCards', { bars, layout: false })
  } else {
    switch (type) {
      case 'Бары':
        bar_type = 'Бар';
        break;
      case 'Кофейни':
        bar_type = 'Кофейня';
        break;
      case 'Рестораны':
        bar_type = 'Ресторан';
        break;
    }
  
    const bars = await Bar.findAll({ where: { bar_type }, raw: true });
  
    for (let i = 0; i < bars.length; i++) {
      for (let j = 0; j < photos.length; j++) {
        if (bars[i].id === photos[j].bar_id) {
          bars[i].bar_photo_name = photos[j].photo_name;
        }
      }
    }
  
    res.render('main/mainCards', { bars, layout: false });
  }
});

module.exports = router;
