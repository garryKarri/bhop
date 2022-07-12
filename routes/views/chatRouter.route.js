const router = require('express').Router()
const profileCheck = require('../../middlewares/profileCheck')
const { User } = require('../../db/models')

router.route('/')
  .get(profileCheck, (req, res) => {
    res.render('chat/chatMain')
  })

router.route('/message/:user_id')
  .get(profileCheck, async (req, res) => {
    const { user_id } = req.params
    const user = await User.findByPk(user_id, { raw: true })

    res.json({ user_name: user.user_name })
  })

module.exports = router
