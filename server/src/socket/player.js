import _ from 'lodash'
import db from '../db'
import actions from '../../../common/actions.json'
import {
  startCaptainVote,
  getGameStatus,
  shouldStartCaptainVote,
  passPlayerPickTurn,
  shouldStartSquadMemberPick,
  startSquadMemberPick,
  getOptimalNumberOfSquads,
  passSquadLeaderPickTurn,
  shouldStartPlayingGame,
  startPlayingGame,
} from '../helpers/game'
import { getGamePlayers } from '../helpers/player'
import logger from '../logger'
import gameStatuses from '../../../common/game-statuses.json'
import playerRoles from '../../../common/player-roles.json'

export default function handlePlayer(io, socket, action) {
  switch (action.type) {
    case actions.GET_PLAYERS_REQUEST:
      return getPlayersRequest(io, socket, action.gameId)
    case actions.JOIN_GAME_REQUEST:
      return joinGameRequest(io, socket, action.gameId)
    case actions.LEAVE_GAME_REQUEST:
      return leaveGameRequest(io, socket, action.gameId)
    case actions.PICK_SQUAD_LEADER_REQUEST:
      return pickSquadLeaderRequest(
        io,
        socket,
        action.gameId,
        action.playerId,
      )
    case actions.PICK_SQUAD_MEMBER_REQUEST:
      return pickSquadMemberRequest(
        io,
        socket,
        action.gameId,
        action.playerId,
      )
    default:
      return null
  }
}

export async function getPlayersRequest(io, socket, gameId) {
  try {
    const players = await getGamePlayers(gameId)
    socket.emit('action', { type: actions.GET_PLAYERS_SUCCESS, data: players })
  } catch (error) {
    logger.exception(error)
    socket.emit('action', { type: actions.GET_PLAYERS_ERROR })
  }
}

async function joinGameRequest(io, socket, gameId) {
  try {
    const { status } = await getGameStatus(gameId)
    if (status !== gameStatuses.QUEUE) {
      throw Error('Game is already started')
    }
    await db('player').insert({
      gameId,
      userId: socket.userId,
    })
    socket.emit('action', { type: actions.JOIN_GAME_SUCCESS })
    await broadcastGamePlayersUpdate(io, gameId)
    const willStartCaptainVote = await shouldStartCaptainVote(gameId)
    if (willStartCaptainVote) {
      const game = await startCaptainVote(gameId)
      io.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
    }
  } catch (error) {
    logger.exception(error)
    socket.emit('action', { type: actions.JOIN_GAME_ERROR })
  }
}

async function leaveGameRequest(io, socket, gameId) {
  try {
    const game = await getGameStatus(gameId)
    if (game.status !== gameStatuses.QUEUE) {
      throw Error('Game is already started')
    }
    await db('player')
      .delete()
      .where({
        gameId,
        userId: socket.userId,
      })
    socket.emit('action', { type: actions.LEAVE_GAME_SUCCESS })
    await broadcastGamePlayersUpdate(io, gameId)
  } catch (error) {
    logger.exception(error)
    socket.emit('action', { type: actions.LEAVE_GAME_ERROR })
  }
}

async function broadcastGamePlayersUpdate(io, gameId) {
  const players = await getGamePlayers(gameId)
  io.emit('action', { type: actions.GET_PLAYERS_SUCCESS, data: players })
}

async function pickSquadLeaderRequest(io, socket, gameId, playerId) {
  try {
    let { 0: game } = await db('game').select('*').where({ id: gameId })
    if (game.status !== gameStatuses.SQUAD_LEADER_PICK) {
      throw Error('Game is not in pick squad leader status')
    }
    const pickingPlayer = await db('player')
      .first('*')
      .where({
        gameId,
        userId: socket.userId,
      })
    if (_.get(pickingPlayer, 'role') !== playerRoles.CAPTAIN) {
      throw Error('You are not allowed to pick')
    }
    if (game.teamWithTurnToPick !== pickingPlayer.team) {
      throw Error('It is not your turn to pick')
    }
    const players = await db('player')
      .select('id')
      .where({
        gameId: game.id,
        team: game.teamWithTurnToPick,
        role: playerRoles.SQUAD_LEADER,
      })
    const player = await db('player')
      .update({
        team: pickingPlayer.team,
        squad: players.length + 2,
        role: playerRoles.SQUAD_LEADER,
      })
      .where({
        gameId,
        userId: playerId,
        role: playerRoles.NONE,
      })
      .returning('*')
    if (player.length === 0) {
      throw Error('Player can not be picked')
    }
    game = await passSquadLeaderPickTurn(game)
    socket.emit('action', { type: actions.PICK_SQUAD_LEADER_SUCCESS })
    await broadcastGamePlayersUpdate(io, gameId)
    const willStartSquadMemberPick = await shouldStartSquadMemberPick(gameId)
    if (willStartSquadMemberPick) {
      game = await startSquadMemberPick(gameId)
    }
    io.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
  } catch (error) {
    logger.exception(error)
    socket.emit('action', { type: actions.PICK_SQUAD_LEADER_ERROR })
  }
}

async function pickSquadMemberRequest(io, socket, gameId, userId) {
  try {
    let { 0: game } = await db('game').select('*').where({ id: gameId })
    if (game.status !== gameStatuses.SQUAD_MEMBER_PICK) {
      throw Error('Game is not in pick squad member status')
    }
    const pickingPlayer = await db('player')
      .first('*')
      .where({
        gameId,
        userId: socket.userId,
      })
    const pickingPlayerRole = _.get(pickingPlayer, 'role')
    if (pickingPlayerRole !== playerRoles.CAPTAIN && pickingPlayerRole !== playerRoles.SQUAD_LEADER) {
      throw Error('You are not allowed to pick')
    }
    const players = await db('player')
      .select('*')
      .where({
        gameId: game.id,
        role: playerRoles.SQUAD_MEMBER,
      })
    const playersInTeam = _.filter(players, { team: pickingPlayer.team })
    const playerCountInSquad = _.filter(playersInTeam, { squad: pickingPlayer.squad }).length
    const smallestSquadPlayerCount = _.chain(playersInTeam)
      .groupBy(player => player.squad)
      .toArray()
      .minBy(squad => squad.length)
      .get('length', 0)
      .value()
    const numberOfSquads = _.chain(playersInTeam)
      .groupBy(player => player.squad)
      .size()
      .value()
    /* console.log(playerCountInSquad)
    console.log(smallestSquadPlayerCount)
    console.log(numberOfSquads)
    console.log(getOptimalNumberOfSquads(game)) */
    if (playerCountInSquad > smallestSquadPlayerCount
      || (numberOfSquads < getOptimalNumberOfSquads(game) && playerCountInSquad !== 0)
      || (game.teamWithTurnToPick !== pickingPlayer.team)) {
      throw Error('It is not your turn to pick')
    }
    const player = await db('player')
      .update({
        team: pickingPlayer.team,
        squad: pickingPlayer.squad,
        role: playerRoles.SQUAD_MEMBER,
      })
      .where({
        gameId,
        userId,
        role: playerRoles.NONE,
      })
      .returning('*')
    if (player.length === 0) {
      throw Error('Player can not be picked')
    }
    game = await passPlayerPickTurn(game, playersInTeam.length + 1)
    socket.emit('action', { type: actions.PICK_SQUAD_MEMBER_SUCCESS })
    await broadcastGamePlayersUpdate(io, gameId)
    const willStartPlayingGame = await shouldStartPlayingGame(gameId)
    if (willStartPlayingGame) {
      game = await startPlayingGame(gameId)
    }
    io.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
  } catch (error) {
    logger.exception(error)
    socket.emit('action', { type: actions.PICK_SQUAD_MEMBER_ERROR })
  }
}
