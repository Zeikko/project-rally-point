import logger from '../logger'
import db from '../db'
import actions from '../../../common/actions.json'

export default function handleGame(io, socket, action) {
  switch (action.type) {
    case actions.GET_GAME_REQUEST:
      return getGameRequest(io, socket)
    case actions.CREATE_GAME_REQUEST:
      return createGameRequest(io, socket)
    default:
      return null
  }
}

export async function getGameRequest(io, socket) {
  try {
    const game = await db('game')
      .orderBy('id', 'desc')
      .first('*')
    socket.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
    return game
  } catch (error) {
    logger.exception(error)
    socket.emit('action', { type: actions.GET_GAME_ERROR })
  }
  return null
}

async function createGameRequest(io, socket) {
  try {
    const { 0: game } = await db('game')
      .insert({})
      .returning('*')
    socket.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
  } catch (error) {
    logger.exception(error)
    socket.emit('action', { type: actions.CREATE_GAME_ERROR })
  }
}
