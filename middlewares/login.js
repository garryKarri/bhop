module.exports = (req, res, next) => {
  if (req.session.user_data) {
    if (req.session.user_data.user_isAdmin) {
      res.locals.isAdmin = true;
      res.locals.isUser = true;
      res.locals.user_name = req.session.user_data.user_name;
      res.locals.user_id = req.session.user_data.id;
      next();
    } else {
      res.locals.isUser = true;
      res.locals.user_name = req.session.user_data.user_name;
      res.locals.user_id = req.session.user_data.id;
      next();
    }
  } else {
    next();
  }
};
