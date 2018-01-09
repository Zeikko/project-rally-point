import _ from 'lodash'
import db from '../db'

export async function shouldStartCaptainVote(gameId) {
  const game = await db('game')
    .first('*')
    .where({ id: gameId })
  const numberOfPlayers = await db('player')
    .count('id')
    .where({ gameId })
  return parseInt(numberOfPlayers[0].count, 10) === game.maxPlayers
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
