import _ from 'lodash'
import db from '../db'
import gameStatuses from '../../../common/game-statuses.json'
import playerRoles from '../../../common/player-roles.json'


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

export async function shouldStartSquadMemberPick(gameId) {
  const game = await db('game')
    .first('*')
    .where({ id: gameId })
  const numberOfSquadLeaders = await db('player')
    .count('id')
    .where({ gameId, role: playerRoles.SQUAD_LEADER })
  return (parseInt(numberOfSquadLeaders[0].count, 10) + 2) === Math.ceil(game.maxPlayers / 9)
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
    .update({
      status: gameStatuses.SQUAD_LEADER_PICK,
      teamWithTurnToPick: 1,
    })
    .where({ id: gameId })
    .returning('*')
  return _.first(games)
}

export async function startSquadMemberPick(gameId) {
  const games = await db('game')
    .update({
      status: gameStatuses.SQUAD_MEMBER_PICK
    })
    .where({ id: gameId })
    .returning('*')
  return _.first(games)
}

export function getGameStatus(gameId) {
  return db('game')
    .first('status')
    .where({ id: gameId })
}

export async function passPlayerPickTurn(id, currentTeam) {
  const games = await db('game')
    .update({
      teamWithTurnToPick: currentTeam === 1 ? 2 : 1
    })
    .where({ id })
    .returning('*')
  return _.first(games)
}
