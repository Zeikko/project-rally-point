import _ from 'lodash'
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

export async function getGameRequest(io, socket) {
  try {
    const game = await db('game')
      .first('*')
      .where({
        status: 'queue',
      })
    socket.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
  } catch (error) {
    socket.emit('action', { type: actions.GET_GAME_ERROR, error })
  }
}

export async function shouldStartCaptainVote(gameId) {
  const numberOfPlayers = await db('player')
    .count('id')
    .where({ gameId })
  return parseInt(numberOfPlayers[0].count, 10) === 48
}

export async function startCaptainVote(gameId) {
  const games = await db('game')
    .update({ status: 'voting captains' })
    .where({ id: gameId })
    .returning('*')
  return _.first(games)
}

export function createNewGame() {
  return db('game').insert({})
}

export function getGameStatus(gameId) {
  return db('game')
    .first('status')
    .where({ id: gameId })
}

