import db from '../db'
import actions from '../../../common/actions.json'
import { startCaptainVote, getGameStatus, shouldStartCaptainVote, createNewGame } from '../helpers/game'
import logger from '../logger'
import gameStatuses from '../../../common/game-statuses'

export default function handlePlayer(io, socket, action) {
  switch (action.type) {
    case actions.GET_PLAYERS_REQUEST:
      return getPlayersRequest(io, socket, action.gameId)
    case actions.JOIN_GAME_REQUEST:
      return joinGameRequest(io, socket, action.gameId)
    case actions.LEAVE_GAME_REQUEST:
      return leaveGameRequest(io, socket, action.gameId)
    case actions.VOTE_CAPTAIN_REQUEST:
      return voteCaptainRequest(io, socket, action.gameId, action.playerId)
    default:
      return null
  }
}

export async function getPlayersRequest(io, socket, gameId) {
  try {
    const players = await getGamePlayers(gameId)
    socket.emit('action', { type: actions.GET_PLAYERS_SUCCESS, data: players })
  } catch (error) {
    logger.error(error)
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
    await broadcastGamePlayersUpdate(io, action.gameId)
    const willStartCaptainVote = await shouldStartCaptainVote(gameId)
    if (willStartCaptainVote) {
      await createNewGame()
      const game = await startCaptainVote(gameId)
      io.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
    }
  } catch (error) {
    logger.error(error)
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
    logger.error(error)
    socket.emit('action', { type: actions.LEAVE_GAME_ERROR })
  }
}

async function voteCaptainRequest(io, socket, gameId, playerId) {
  try {
    console.log(gameId)
    const { status } = await getGameStatus(gameId)
    if (status !== gameStatuses.VOTE_CAPTAINS) {
      throw Error('Game is not in captain vote')
    }
    console.log(gameId, socket.userId, playerId)
    await db('captainVote').insert({
      gameId,
      voterId: socket.userId,
      votedId: playerId
    })
    socket.emit('action', { type: actions.VOTE_CAPTAIN_SUCCESS })
    /*await broadcastGamePlayersUpdate(io, action.gameId)
    const willStartCaptainVote = await shouldStartCaptainVote(gameId)
    if (willStartCaptainVote) {
      await createNewGame()
      const game = await startCaptainVote(gameId)
      io.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
    }*/
  } catch (error) {
    console.log(error)
    logger.error(error)
    socket.emit('action', { type: actions.VOTE_CAPTAIN_ERROR })
  }
}

function getGamePlayers(gameId) {
  return db('player')
    .select('user.*')
    .leftJoin('user', 'player.userId', 'user.id')
    .where({ gameId })
}

async function broadcastGamePlayersUpdate(io, gameId) {
  const players = await getGamePlayers(gameId)
  io.emit('action', { type: actions.GET_PLAYERS_SUCCESS, data: players })
}
