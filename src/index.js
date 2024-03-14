const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars')
const flash = require('connect-flash');
const passport = require('passport');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config()

const MessageDAO = require('./dao/MongoMessageManager');
const { port } = require('./config/config');
require('./database/database')

const app = express()
require('./helper/passport')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "./views"));

app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

app.use(require('./routes/users.routes'))
app.use(require('./routes/products.routes'))
app.use(require('./routes/carts.routes'))
app.use(require('./routes/index.routes'))
app.use(require('./routes/message.routes'))

app.use(express.static(path.join(__dirname, "../public")))

const httpServer = http.createServer(app)

httpServer.listen(port, () => {
    console.log("Server running on port " + port);
})

const io = new Server(httpServer)

const messageDao = new MessageDAO()

io.on('connection', async (socket) => {

    console.log("You are connected!");

    socket.on("newMessage", async (message) => {
        await messageDao.createMessage(message.user, message.message)
        const messages = await messageDao.getMessages()
        io.emit("updateMessages", messages)
    })


})