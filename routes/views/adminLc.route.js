const router = require('express').Router();
const adminCheck = require('../../middlewares/adminCheck');
const bcrypt = require('bcrypt');
const { User, Bar, Favorite } = require('../../db/models');

const Sequelize = require('sequelize');
const { Op } = Sequelize;

router.route('/').get(adminCheck, (req, res) => {
  res.render('adminLc/lc');
});

// Показать список пользователей
router.route('/users').get(adminCheck, async (req, res) => {
  const users = await User.findAll({ raw: true });

  for (let i = 0; i < users.length; i++) {
    users[i].createdAt = users[i].createdAt.toLocaleString();
  }

  res.render('adminLc/showUsers', { layout: false, users });
});

// Сделать админом
router.route('/users/adminOn/:user_id').get(adminCheck, async (req, res) => {
  const { user_id } = req.params;

  const user = await User.findByPk(user_id);
  await user.update({ user_isAdmin: true });

  res.render('adminLc/confirm', {
    layout: false,
    admin: true,
    user_name: user.user_name,
  });
});

// Снять админа
router.route('/users/adminOff/:user_id').get(adminCheck, async (req, res) => {
  const { user_id } = req.params;

  const user = await User.findByPk(user_id);
  await user.update({ user_isAdmin: false });

  res.render('adminLc/confirm', {
    layout: false,
    admin: false,
    user_name: user.user_name,
  });
});

// Удалить пользователя
router
  .route('/users/delete/:user_id')
  .get(adminCheck, async (req, res) => {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    res.render('adminLc/delete', { layout: false, user });
  })
  .delete(async (req, res) => {
    const { user_id } = req.params;

    await User.destroy({ where: { id: user_id } });

    const users = await User.findAll({ raw: true });

    for (let i = 0; i < users.length; i++) {
      users[i].createdAt = users[i].createdAt.toLocaleString();
    }
  
    res.render('adminLc/showUsers', { layout: false, users })
  });

router.route('/profile/:user_id').get(adminCheck, async (req, res) => {
  const { user_id } = req.params;

  const user = await User.findByPk(user_id);

  res.render('adminLc/profile', { layout: false, user });
});

// Изменить профиль
router.route('/change').post(async (req, res) => {
  const id = res.locals.user_id;
  const { user_email } = req.body;

  const checkEmail = await User.findOne({ where: { user_email }, raw: true });

  if (req.body.user_sex === 'Пол') {
    req.body.user_sex = '';
  }

  if (checkEmail && checkEmail.id != id) {
    res.render('adminLc/changeConfirm', {
      layout: false,
      check: false,
      message: 'такая почта уже используется',
    });
  } else {
    // Валидация почты
    const regexpEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = regexpEmail.test(user_email);

    if (!email) {
      res.render('adminLc/changeConfirm', {
        layout: false,
        check: false,
        message: 'неверно указан почтовый адрес',
      });
    } else {
      const user = await User.findByPk(id);
      const update = await user.update(req.body);

      res.render('adminLc/changeConfirm', {
        layout: false,
        check: true,
        user_name: update.user_name,
      });
    }
  }
});

router
  .route('/change/password/:user_id')
  .get(adminCheck, (req, res) => {
    res.render('adminLc/changePassword', { layout: false });
  })
  .post(async (req, res) => {
    const { user_old_password, user_password, user_password_repeat } = req.body;
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);
    const check = await bcrypt.compare(user_old_password, user.user_password);

    // Валдиация пароля
    const regexpPassword =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    const password = regexpPassword.test(user_password);

    if (!check) {
      res.render('adminLc/changeConfirm', {
        layout: false,
        check: false,
        message: 'вы неверно указали старый пароль',
      });
    } else {
      if (!password) {
        res.render('adminLc/changeConfirm', {
          layout: false,
          check: false,
          message:
            'новый пароль должен содержать не менее 8 символов и состоять из спец. символов, строчных и заглавных букв',
        });
      } else {
        if (user_password !== user_password_repeat) {
          res.render('adminLc/changeConfirm', {
            layout: false,
            check: false,
            message: 'пароли не совпадают',
          });
        } else {
          const newPassword = await bcrypt.hash(user_password, 10);
          await user.update({ user_password: newPassword });

          res.render('adminLc/changeConfirm', {
            layout: false,
            check: true,
          });
        }
      }
    }
  });

// Список избранных
router.route('/users/favorites/:user_id')
  .get(adminCheck, async (req, res) => {
    const { user_id } = req.params

    const favorites = await Favorite.findAll({ raw: true, where: { user_id }})
    const barsId = favorites.map(el => el = el.bar_id)
    const bars = await Bar.findAll({ raw: true, where: { id: { [Op.or]: barsId } } })
    
    res.render('adminLc/usersFavorites', { layout: false, bars })
  })

module.exports = router;
