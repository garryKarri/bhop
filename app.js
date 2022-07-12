// npm
const config = require('./config/config')
const express = require('express')

// socket
const { Server } = require('socket.io')
const { createServer } = require('http')

// middlewares
const error404 = require('./middlewares/404')

// routers
const mainRouter = require('./routes/views/main.route')
const formRouter = require('./routes/views/form.route')
const mapRouter = require('./routes/views/map.route')
const mapRoutesRouter = require('./routes/views/mapRoutesRouter.route')
const profileRouter = require('./routes/views/profile.route')
const profileLcRouter = require('./routes/views/profileLc.route')
const profileLcMailRouter = require('./routes/views/profileLcMailRouter.route')
const adminRouter = require('./routes/views/admin.route')
const adminLcRouter = require('./routes/views/adminLc.route')
const chatRouter = require('./routes/views/chatRouter.route')

// app && PORT
const app = express()
const PORT = process.env.PORT ?? 3000

// socket server
const httpServer = createServer(app)
const io = new Server(httpServer)

// config
config(app)

// routes
app.use('/', mainRouter)
app.use('/form', formRouter)
app.use('/map', mapRouter)
app.use('/map/routes', mapRoutesRouter)
app.use('/profile', profileRouter)
app.use('/profile/lc', profileLcRouter)
app.use('/profile/lc/mail', profileLcMailRouter)
app.use('/admin', adminRouter)
app.use('/admin/lc', adminLcRouter)
app.use('/chat', chatRouter)

// 404 Error
app.use(error404)

// socket connection
io.on('connection', (socket) => {
  socket.on('chat:choiceBar', (data) => {
    io.emit('chat:choiceBar', { message: data.message, user_name: data.user_name })
  })
})

// socket listen
httpServer.listen(PORT, () => { console.log(`*** Socket-Working at PORT: ${PORT} ***`) })
