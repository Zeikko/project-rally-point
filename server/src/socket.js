import socketIo from 'socket.io' 
import connectPgSimple from 'connect-pg-simple'
import passportSocketIo from 'passport.socketio'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import app from './app'
import game, { getGameRequest } from './socket/game'
import player, { getPlayersRequest } from './socket/player'
import sessionStore from './session-store'
import config from './config'

const PgSession = connectPgSimple(session)

const io = socketIo()

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: config.session.key,
  secret: config.session.secret,
  store: sessionStore,
}));

io.attach(app)
io.on('connection', function(socket) {
  getGameRequest(io, socket)
  socket.on('action', (action) => {
    console.log(action)
    game(io, socket, action)
    player(io, socket, action)
  })
})
