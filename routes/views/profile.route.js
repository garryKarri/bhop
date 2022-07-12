const router = require('express').Router();
const profileCheck = require('../../middlewares/profileCheck');
const upload = require('../../middlewares/multer');
const { User, Bar, Photo, Favorite } = require('../../db/models');

const Sequelize = require('sequelize');
const { Op } = Sequelize;

// Show Profile Page
router.route('/page/:user_name').get(profileCheck, async (req, res) => {
  const user_id = req.session.user_data.id;

  const favs = await Favorite.findAll({ where: { user_id }, raw: true });
  const bar = await Bar.findAll({ raw: true });
  const photos = await Photo.findAll({ raw: true });

  let bars = [];

  for (let i = 0; i < favs.length; i++) {
    for (let j = 0; j < bar.length; j++) {
      for (let k = 0; k < photos.length; k++) {
        if (favs[i].bar_id === bar[j].id && bar[j].id === photos[k].bar_id) {
          bar[j].bar_photo_name = photos[k].photo_name;
          bars.push(bar[j]);
        }
      }
    }
  }

  res.render('profile/profile', { bars });
});

router.route('/change/:id').get(async (req, res) => {});

// Delete Button
router
  .route('/delete/:id')
  .get(profileCheck, async (req, res) => {
    const { id } = req.params;

    const bar = await Bar.findByPk(id, { raw: true });

    res.render('profile/confirm', { layout: false, bar });
  })
  .delete(profileCheck, async (req, res) => {
    const { id } = req.params;

    await Favorite.destroy({ where: { bar_id: id } });

    const user_id = req.session.user_data.id;

    const favs = await Favorite.findAll({ where: { user_id }, raw: true });
    const bar = await Bar.findAll({ raw: true });
    const photos = await Photo.findAll({ raw: true });

    let bars = [];

    for (let i = 0; i < favs.length; i++) {
      for (let j = 0; j < bar.length; j++) {
        for (let k = 0; k < photos.length; k++) {
          if (favs[i].bar_id === bar[j].id && bar[j].id === photos[k].bar_id) {
            bar[j].bar_photo_name = photos[k].photo_name;
            bars.push(bar[j]);
          }
        }
      }
    }

    res.render('profile/cards', { layout: false, bars });
  });

// С кем пойти?
router.route('/group/:bar_id').get(profileCheck, async (req, res) => {
  const { bar_id } = req.params;

  const bar = await Bar.findByPk(bar_id, { raw: true });

  const favorites = await Favorite.findAll({ raw: true, where: { bar_id } });

  const usersId = favorites.map((el) => (el = el.user_id));

  const users = await User.findAll({
    raw: true,
    where: { id: { [Op.or]: usersId } },
  });

  for (let i = 0; i < users.length; i++) {
    users[i].bar_id = bar.id
  }

  res.render('profile/favoritesList', {
    layout: false,
    users,
    bar_type: bar.bar_type,
    bar_title: bar.bar_title,
  });
});

module.exports = router;
