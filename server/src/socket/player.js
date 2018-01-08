import db from '../db'
import actions from '../../../common/actions.json'
import { startCaptainVote, getGameStatus, shouldStartCaptainVote, createNewGame } from './game'

export default function handlePlayer(io, socket, action) {
  switch (action.type) {
    case actions.GET_PLAYERS_REQUEST:
      return getPlayersRequest(io, socket, action)
    case actions.JOIN_GAME_REQUEST:
      return joinGameRequest(io, socket, action)
    case actions.LEAVE_GAME_REQUEST:
      return leaveGameRequest(io, socket, action)
    default:
      return null
  }
}

async function getPlayersRequest(io, socket, action) {
  try {
    const players = await getGamePlayers(action.gameId)
    socket.emit('action', { type: actions.GET_PLAYERS_SUCCESS, data: players })
  } catch (error) {
    socket.emit('action', { type: actions.GET_PLAYERS_ERROR })
  }
}

async function joinGameRequest(io, socket, action) {
  try {
    const { gameId } = action
    const { status } = await getGameStatus(gameId)
    if (status !== 'queue') {
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
    socket.emit('action', { type: actions.JOIN_GAME_ERROR })
  }
}

async function leaveGameRequest(io, socket, action) {
  try {
    const { gameId } = action
    const game = await getGameStatus(gameId)
    if (game.status !== 'queue') {
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
    socket.emit('action', { type: actions.LEAVE_GAME_ERROR })
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
