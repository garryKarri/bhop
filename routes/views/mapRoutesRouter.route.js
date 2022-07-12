const router = require('express').Router()
const { User, Bar } = require('../../db/models')

router.route('/:bar_id')
  .get(async (req, res) => {
    const { bar_id } = req.params
    const user_id = req.session.user_data.id

    const bar = await Bar.findByPk(bar_id, { raw: true })
    const user = await User.findByPk(user_id, { raw: true })

    const bar_address = `${bar.bar_city}, ${bar.bar_street}, ${bar.bar_house}`
    const user_address = `${user.user_city}, ${user.user_street}, ${user.user_house}`

    res.json({
      bar_address,
      user_address
    })
  })
  
module.exports = router
