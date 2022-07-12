require('dotenv').config();
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const sessionConfig = require('./sessionConfig')
const login = require('../middlewares/login')

const config = (app) => {
  // set
  app.set('view engine', 'hbs')
  app.set('views', path.join(process.env.PWD, 'views'))
  hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'))

  // use
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.join(process.env.PWD, 'public')))

  // session
  app.use(cookieParser())
  app.use(session(sessionConfig))

  // middlewares
  app.use(login)
}

module.exports = config
