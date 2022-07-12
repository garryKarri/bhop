const router = require('express').Router();
const profileCheck = require('../../middlewares/profileCheck');
const { User, Bar, Mail } = require('../../db/models');

const Sequelize = require('sequelize');
const { Op } = Sequelize;

// Обработка кнопки Пригласить
router.route('/request/:user_id/:bar_id').get(profileCheck, async (req, res) => {
  const { user_id, bar_id } = req.params
  const from_user_id = req.session.user_data.id

  const mail = await Mail.findOne({ raw: true, where: { from_user_id, to_user_id: user_id, bar_id } })
  const to_user = await User.findByPk(user_id, { raw: true })

  if (mail) {
    res.render('profile/confirmJoinMail', { 
      layout: false,
      mailStatus: false,
      user_name: to_user.user_name
    })
  } else {
    await Mail.create({ from_user_id, to_user_id: user_id, bar_id, mail_status: true })

    res.render('profile/confirmJoinMail', { 
      layout: false,
      mailStatus: true,
      user_name: to_user.user_name
    })
  } 
})

// Показать список приглашений
router.route('/accept/:user_id').get(profileCheck, async (req, res) => {
  const { user_id } = req.params;

  const invites = await Mail.findAll({ raw: true, where: { to_user_id: user_id } })
  const usersList = []

  for (let i = 0; i < invites.length; i++) {
    let obj = {}
    const user = await User.findByPk(invites[i].from_user_id, { raw: true })
    const bar = await Bar.findByPk(invites[i].bar_id, { raw: true })
    obj.id = invites[i].id
    obj.user_name = user.user_name
    obj.bar_type = bar.bar_type
    obj.bar_title = bar.bar_title
    obj.date = bar.createdAt.toLocaleString()
    usersList.push(obj)
  }

  res.render('mail/mailMain', { usersList, count: usersList.length });
});

// Подтвердить приглашение
router.route('/delete/:mail_id')
  .get(profileCheck, async (req, res) => {
    const { mail_id } = req.params

    await Mail.destroy({ where: { id: mail_id } })

    res.render('mail/inviteConfirm', { layout: false, mailStatus: true })
  })

module.exports = router;
