import logger from '../logger'
import db from '../db'
import actions from '../../../common/actions.json'
import gameStatuses from '../../../common/game-statuses'

export default function handleGame(io, socket, action) {
  switch (action.type) {
    case actions.GET_GAME_REQUEST:
      return getGameRequest(io, socket, action)
    default:
      return null
  }
}

export async function getGameRequest(io, socket) {
  try {
    const game = await db('game')
      .first('*')
    socket.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
    return game
  } catch (error) {
    logger.error(error)
    socket.emit('action', { type: actions.GET_GAME_ERROR })
  }
}
