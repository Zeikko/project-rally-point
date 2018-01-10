import _ from 'lodash'
import socketIo from 'socket.io'
import passportSocketIo from 'passport.socketio'
import cookieParser from 'cookie-parser'
import { server } from './app'
import handleGame, { getGameRequest } from './socket/game'
import handlePlayer, { getPlayersRequest } from './socket/player'
import handleCaptainVote, { getCaptainVotes } from './socket/captain-vote'
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
io.on('connection', async (socket) => {
  const game = await getGameRequest(io, socket)
  getPlayersRequest(io, socket, game.id)
  getCaptainVotes(io, socket, game.id)
  socket.on('action', (action) => {
    socket.userId = getUserId(action, socket) // eslint-disable-line no-param-reassign
    handleGame(io, socket, action)
    handlePlayer(io, socket, action)
    handleCaptainVote(io, socket, action)
  })
})

function getUserId(action, socket) {
  if (action.userId) {
    return action.userId
  }
  return _.get(socket, 'request.user.id')
}
