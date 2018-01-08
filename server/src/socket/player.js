import _ from 'lodash'
import db from '../db'
import actions from '../../../common/actions.json'

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

function getPlayersRequest(io, socket, action) {
  return getGamePlayers(action.gameId)
    .then(players => socket.emit('action', {
      type: actions.GET_PLAYERS_SUCCESS,
      data: players,
    }))
    .catch(() => socket.emit('action', {
      type: actions.GET_PLAYERS_ERROR,
    }))
}

function joinGameRequest(io, socket, action) {
  const { gameId } = action
  return db('player')
    .insert({
      gameId,
      userId: _.get(socket, 'request.user.id'),
    })
    .then(() => {
      socket.emit('action', { type: actions.JOIN_GAME_SUCCESS })
      return broadcastGamePlayersUpdate(io, action.gameId)
    })
    .catch(() => socket.emit('action', {
      type: actions.JOIN_GAME_ERROR,
    }))
}

function leaveGameRequest(io, socket, action) {
  const { gameId } = action
  return db('player')
    .delete({
      gameId,
      userId: _.get(socket, 'request.user.id'),
    })
    .then(() => {
      socket.emit('action', { type: actions.LEAVE_GAME_SUCCESS })
      return broadcastGamePlayersUpdate(io, gameId)
    })
    .catch(() => socket.emit('action', {
      type: actions.LEAVE_GAME_ERROR,
    }))
}

function getGamePlayers(gameId) {
  return db('player')
    .select('user.*')
    .leftJoin('user', 'player.userId', 'user.id')
    .where({
      gameId,
    })
}

function broadcastGamePlayersUpdate(io, gameId) {
  return getGamePlayers(gameId)
    .then(players => io.emit('action', {
      type: actions.GET_PLAYERS_SUCCESS,
      data: players,
    }))
}
