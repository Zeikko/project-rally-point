import socketIo from 'socket.io'
import passportSocketIo from 'passport.socketio'
import cookieParser from 'cookie-parser'
import { server } from './app'
import game, { getGameRequest } from './socket/game'
import player from './socket/player'
import sessionStore from './session-store'
import config from './config'

const io = socketIo()

io.use(passportSocketIo.authorize({
  cookieParser,
  key: config.session.key,
  secret: config.session.secret,
  store: sessionStore,
}))
io.attach(server)
io.on('connection', (socket) => {
  getGameRequest(io, socket)
  socket.on('action', (action) => {
    game(io, socket, action)
    player(io, socket, action)
  })
})
