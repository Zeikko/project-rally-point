import db from '../db'
import actions from '../../../common/actions'
import { getGamePlayers } from './player'

export default function game(io, socket, action) {
  switch(action.type) {
    case actions.JOIN_GAME_REQUEST:
      return joinGameRequest(io, socket, action)
    case actions.GET_GAME_REQUEST:
      return getGameRequest(io, socket, action)
    case actions.LEAVE_GAME_REQUEST:
      return leaveGameRequest(io, socket, action)
  }
}

export function getGameRequest(io, socket, action) {
  return db('game')
    .first('*')
    .where({
      status: 'queue'
    })
    .then((game) => {
      socket.emit('action', {
        type: actions.GET_GAME_SUCCESS,
        data: game
      })
    })
}

function joinGameRequest(io, socket, action) {
  console.log(socket.request.user)
  return db('player')
    .insert({
      gameId: action.id,
      userId: socket.request.user.id
    })
    .then(() => {
      socket.emit('action', {
        type: actions.JOIN_GAME_SUCCESS
      })
      return broadcastGamePlayersUpdate(io, action.id)
    })
    .catch(() => {
      console.log('ERROR')
      socket.emit('action', {
        type: actions.JOIN_GAME_ERROR
      })
    })
}

function leaveGameRequest(io, socket,action) {
  return db('player')
    .delete({
      gameId: action.id,
      userId: socket.request.user.id
    })
    .then(() => {
      socket.emit('action', {
        type: actions.LEAVE_GAME_SUCCESS
      })
      return broadcastGamePlayersUpdate(io, action.id)
    })
    .catch(() => {
      console.log('ERROR')
      socket.emit('action', {
        type: actions.LEAVE_GAME_ERROR
      })
    })
}

function broadcastGamePlayersUpdate(io, gameId) {
  return getGamePlayers(gameId)
    .then((players) => {
      io.emit('action', {
        type: actions.GET_PLAYERS_SUCCESS,
        data: players
      })
    })
}