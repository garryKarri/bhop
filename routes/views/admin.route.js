const router = require('express').Router();
const adminCheck = require('../../middlewares/adminCheck');
const upload = require('../../middlewares/multer');
const { User, Bar, Photo, Favorite } = require('../../db/models');

// Show Admin Page
router.route('/').get(adminCheck, async (req, res) => {
  const bars = await Bar.findAll({ raw: true });
  const photos = await Photo.findAll({ raw: true });

  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < photos.length; j++) {
      if (bars[i].id === photos[j].bar_id) {
        bars[i].bar_photo_name = photos[j].photo_name;
      }
    }
  }

  res.render('admin/admin', { bars });
});

// Add Form
router
  .route('/add')
  .get((req, res) => {
    res.render('admin/form', { layout: false, addForm: true });
  })
  .post(upload.array('bar_photo'), async (req, res) => {
    const barAdd = await Bar.create(req.body);

    const photoNames = [];

    req.files.forEach((el) => {
      let obj = {};
      obj.photo_name = el.originalname;
      obj.bar_id = barAdd.dataValues.id;
      photoNames.push(obj);
    });

    for (let i = 0; i < photoNames.length; i++) {
      await Photo.create(photoNames[i]);
    }

    const bars = await Bar.findAll({ raw: true });
    const photos = await Photo.findAll({ raw: true });

    for (let i = 0; i < bars.length; i++) {
      for (let j = 0; j < photos.length; j++) {
        if (bars[i].id === photos[j].bar_id) {
          bars[i].bar_photo_name = photos[j].photo_name;
        }
      }
    }

    res.render('admin/cards', { layout: false, bars });
  });

// Change Form
router
  .route('/change/:bar_id')
  .get(adminCheck, async (req, res) => {
    const { bar_id } = req.params;

    const bar = await Bar.findByPk(bar_id, { raw: true });

    res.render('admin/form', { bar, layout: false, addForm: false });
  })
  .post(upload.array('bar_photo'), async (req, res) => {
    const { bar_id } = req.params;

    const change = await Bar.findByPk(bar_id);
    await change.update(req.body);

    await Photo.destroy({ where: { bar_id } });
    const photoNames = [];

    req.files.forEach((el) => {
      let obj = {};
      obj.photo_name = el.originalname;
      obj.bar_id = bar_id;
      photoNames.push(obj);
    });

    for (let i = 0; i < photoNames.length; i++) {
      await Photo.create(photoNames[i]);
    }

    const bars = await Bar.findAll({ raw: true });
    const photos = await Photo.findAll({ raw: true });

    for (let i = 0; i < bars.length; i++) {
      for (let j = 0; j < photos.length; j++) {
        if (bars[i].id === photos[j].bar_id) {
          bars[i].bar_photo_name = photos[j].photo_name;
        }
      }
    }

    res.render('admin/cards', { layout: false, bars });
  });

// Delete Form
router
  .route('/delete/:bar_id')
  .get(adminCheck, async (req, res) => {
    const { bar_id } = req.params;

    const bar = await Bar.findByPk(bar_id, { raw: true });

    res.render('admin/confirm', { layout: false, bar });
  })
  .delete(async (req, res) => {
    const { bar_id } = req.params;

    await Bar.destroy({ where: { id: bar_id } });

    const bars = await Bar.findAll({ raw: true });
    const photos = await Photo.findAll({ raw: true });

    for (let i = 0; i < bars.length; i++) {
      for (let j = 0; j < photos.length; j++) {
        if (bars[i].id === photos[j].bar_id) {
          bars[i].bar_photo_name = photos[j].photo_name;
        }
      }
    }

    res.render('admin/cards', { layout: false, bars });
  });

module.exports = router;
