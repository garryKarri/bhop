module.exports = (req, res, next) => {
  if (res.locals.isAdmin) {
    next()
  } else {
    res.redirect('/')
  }
}
