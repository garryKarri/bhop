const router = require('express').Router();
const profileCheck = require('../../middlewares/profileCheck');
const bcrypt = require('bcrypt')
const { User } = require('../../db/models');

router
  .route('/change/:user_id')
  .get(profileCheck, async (req, res) => {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, { raw: true });

    res.render('profile/changeForm', { layout: false, user });
  })
  .post(profileCheck, async (req, res) => {
    const { user_id } = req.params;
    let { user_email, user_sex } = req.body

    const checkEmail = await User.findOne({ where: { user_email }, raw: true });

    if (user_sex === 'Пол') {
      user_sex = '';
    }

    if (checkEmail && checkEmail.id != user_id) {
      res.render('profile/confirmChanges', {
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
        res.render('profile/confirmChanges', {
          layout: false,
          check: false,
          message: 'неверно указан почтовый адрес',
        })
      } else {
        const user = await User.findByPk(user_id)
        const update = await user.update(req.body)

        res.render('profile/confirmChanges', {
          layout: false,
          check: true,
          user_name: update.user_name,
        })
      }
    }
  });

router.route('/change/password/:user_id')
  .get(profileCheck, async (req, res) => {
    res.render('profile/changePassword', { layout: false })
  })  
  .post(profileCheck, async (req, res) => {
    const { user_id } = req.params
    const { user_old_password, user_password, user_password_repeat } = req.body

    const user = await User.findByPk(user_id)
    const check = await bcrypt.compare(user_old_password, user.user_password)

    // Валдиация пароля
    const regexpPassword =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    const password = regexpPassword.test(user_password);

    if (!check) {
      res.render('profile/confirmChanges', {
        layout: false,
        check: false,
        message: 'вы неверно указали старый пароль',
      });
    } else {
      if (!password) {
        res.render('profile/confirmChanges', {
          layout: false,
          check: false,
          message:
            'новый пароль должен содержать не менее 8 символов и состоять из спец. символов, строчных и заглавных букв',
        });
      } else {
        if (user_password !== user_password_repeat) {
          res.render('profile/confirmChanges', {
            layout: false,
            check: false,
            message: 'пароли не совпадают',
          });
        } else {
          const newPassword = await bcrypt.hash(user_password, 10);
          await user.update({ user_password: newPassword });

          res.render('profile/confirmChanges', {
            layout: false,
            check: true,
          });
        }
      }
    }

  })

module.exports = router;
