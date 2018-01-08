import _ from 'lodash'
import io from 'socket.io-client'
import db from '../src/db'
import actions from '../../common/actions.json'

const socket = io('http://localhost:8083')

socket.on('connect', () => {
  console.log('socket connected')
})

socket.on('disconnect', (reason) => {
  console.log(`socket disconnected reason: ${reason}`)
})
socket.open()

db('game')
  .first('*')
  .where({ status: 'queue' })
  .then(game => createUser()
    .then(user => ({ game, user })))
  .then(({ game, user }) => {
    console.log(game)
    console.log(user)
    socket.emit('action', {
      type: actions.JOIN_GAME_REQUEST,
      gameId: game.id,
    })
  })

function createUser() {
  const steamId = _.uniqueId()
  return db('user')
    .insert({
      steamId,
      displayName: 'Test user',
      profileUrl: `http://steamcommunity.com/id/${steamId}`,
    })
    .returning('id')
}
