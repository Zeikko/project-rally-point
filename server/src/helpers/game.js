import _ from 'lodash'
import db from '../db'
import gameStatuses from '../../../common/game-statuses.json'

export async function shouldStartCaptainVote(gameId) {
  const game = await db('game')
    .first('*')
    .where({ id: gameId })
  const numberOfPlayers = await db('player')
    .count('id')
    .where({ gameId })
  return parseInt(numberOfPlayers[0].count, 10) === game.maxPlayers
}

export async function shouldStartSquadLeaderPick(gameId) {
  const game = await db('game')
    .first('*')
    .where({ id: gameId })
  const numberOfCaptainVotes = await db('captainVote')
    .count('id')
    .where({ gameId })
  return parseInt(numberOfCaptainVotes[0].count, 10) === game.maxPlayers
}

export async function startCaptainVote(gameId) {
  const games = await db('game')
    .update({ status: gameStatuses.VOTE_CAPTAINS })
    .where({ id: gameId })
    .returning('*')
  return _.first(games)
}

export async function startSquadLeaderPick(gameId) {
  const games = await db('game')
    .update({ status: gameStatuses.SQUAD_LEADER_PICK })
    .where({ id: gameId })
    .returning('*')
  return _.first(games)
}

export function getGameStatus(gameId) {
  return db('game')
    .first('status')
    .where({ id: gameId })
}
