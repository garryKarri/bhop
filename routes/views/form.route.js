const router = require('express').Router();
const bcrypt = require('bcrypt');
const formCheck = require('../../middlewares/formCheck');
const { User } = require('../../db/models');

// Login Form
router
  .route('/login')
  .get(formCheck, (req, res) => {
    res.render('form/login');
  })
  .post(async (req, res) => {
    const { user_email, user_password } = req.body;

    const data = await User.findOne({ where: { user_email }, raw: true });

    if (data) {
      const pass = await bcrypt.compare(user_password, data.user_password);

      if (pass) {
        req.session.user_data = data;
        res.render('form/succes', { layout: false, user_name: data.user_name });
      } else {
        res.render('form/error', { layout: false, error: 'Неверный пароль' });
      }
    } else {
      res.render('form/error', {
        layout: false,
        error: 'Такой почты не существует',
      });
    }
  });

// Registration Form
router
  .route('/reg')
  .get(formCheck, (req, res) => {
    res.render('form/reg');
  })
  .post(async (req, res) => {
    let {
      user_name,
      user_email,
      user_password,
      user_password_repeat,
      user_secret_word,
      user_sex,
      user_age,
      user_city,
      user_street,
      user_house,
    } = req.body;

    const data = await User.findOne({ where: { user_email } });

    // Валидация почты
    const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const email = regexpEmail.test(user_email)

    // Валдиация пароля
    const regexpPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
    const password = regexpPassword.test(user_password)

    if (data) {
      res.render('form/error', {
        layout: false,
        error: 'Данная почта уже используется',
      });
    } else if (user_name.length === 0 && user_email.length === 0 && user_password.length === 0) {
      res.render('form/error', {
        layout: false,
        error: 'Остались незаполненные поля'
      })
    } else if (!email) {
      res.render('form/error', {
        layout: false,
        error: 'Неверно указан почтовый адрес'
      })
    } else if (!password) {
      res.render('form/error', {
        layout: false,
        error: 'Пароль должен содержать не менее 8 символов и состоять из спец. символов, строчных и заглавных букв'
      })
    } else if (user_password !== user_password_repeat) {
      res.render('form/error', {
        layout: false,
        error: 'Пароли не совпадают'
      })
    } else {
      const newPass = await bcrypt.hash(user_password, 10);

      if (user_sex === 'Пол') {
        user_sex = '';
      }

      if (user_secret_word.toLowerCase() === 'ебатория') {
        await User.create({
          user_name,
          user_email,
          user_password: newPass,
          user_isAdmin: true,
          user_sex,
          user_age,
          user_city,
          user_street,
          user_house,
        });
      } else {
        await User.create({
          user_name,
          user_email,
          user_password: newPass,
          user_isAdmin: false,
          user_sex,
          user_age,
          user_city,
          user_street,
          user_house,
        });
      }

      res.render('form/login', { layout: false });
    }
  });

// Logout
router.route('/logout').get((req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
