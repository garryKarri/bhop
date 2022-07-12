const session = require('express-session')
const FileStore = require('session-file-store')(session)

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: true,
  saveUnitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,  // 1 day
    httpOnly: true
  }
}

module.exports = sessionConfig
