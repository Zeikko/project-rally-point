import db from '../db'
import actions from '../../../common/actions.json'

export default function handleGame(io, socket, action) {
  switch (action.type) {
    case actions.GET_GAME_REQUEST:
      return getGameRequest(io, socket, action)
    default:
      return null
  }
}

export function getGameRequest(io, socket) {
  return db('game')
    .first('*')
    .where({
      status: 'queue',
    })
    .then(game => socket.emit('action', {
      type: actions.GET_GAME_SUCCESS,
      data: game,
    }))
    .catch(() => socket.emit('action', {
      type: actions.GET_GAME_ERROR,
    }))
}
