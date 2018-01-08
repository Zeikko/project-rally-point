import * as actions from '../../../common/actions.json'

export const getPlayersAction = gameId => ({
  type: actions.GET_PLAYERS_REQUEST,
  socket: true,
  gameId,
})

export const joinGameAction = gameId => ({
  type: actions.JOIN_GAME_REQUEST,
  socket: true,
  gameId,
})

export const leaveGameAction = gameId => ({
  type: actions.LEAVE_GAME_REQUEST,
  socket: true,
  gameId,
})

