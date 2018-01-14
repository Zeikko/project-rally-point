import db from '../db'
import actions from '../../../common/actions.json'
import {
  startCaptainVote,
  getGameStatus,
  shouldStartCaptainVote,
  passPlayerPickTurn,
  shouldStartSquadMemberPick,
  startSquadMemberPick,
} from '../helpers/game'
import { getGamePlayers } from '../helpers/player'
import logger from '../logger'
import gameStatuses from '../../../common/game-statuses.json'

export default function handlePlayer(io, socket, action) {
  switch (action.type) {
    case actions.GET_PLAYERS_REQUEST:
      return getPlayersRequest(io, socket, action.gameId)
    case actions.JOIN_GAME_REQUEST:
      return joinGameRequest(io, socket, action.gameId)
    case actions.LEAVE_GAME_REQUEST:
      return leaveGameRequest(io, socket, action.gameId)
    case actions.PICK_PLAYER_REQUEST:
      return pickPlayerRequest(
        io,
        socket,
        action.gameId,
        action.userId,
        action.team,
        action.squad,
        action.role,
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

async function pickPlayerRequest(io, socket, gameId, userId, team, squad, role) {
  try {
    let game = await getGameStatus(gameId)
    if (game.status !== gameStatuses.SQUAD_LEADER_PICK) {
      throw Error('Game is not in pick status')
    }
    const player = await db('player')
      .update({
        team,
        squad,
        role,
      })
      .where({
        gameId,
        userId,
      })
      .returning('*')
    if (player.length === 0) {
      throw Error('Picked player is not in the game')
    }
    game = await passPlayerPickTurn(gameId, team)
    socket.emit('action', { type: actions.PICK_PLAYER_SUCCESS })
    await broadcastGamePlayersUpdate(io, gameId)
    const willStartSquadMemberPick = await shouldStartSquadMemberPick(gameId)
    if (willStartSquadMemberPick) {
      game = await startSquadMemberPick(gameId)
    }
    io.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
  } catch (error) {
    logger.exception(error)
    socket.emit('action', { type: actions.PICK_PLAYER_ERROR })
  }
}
