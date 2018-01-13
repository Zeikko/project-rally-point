import * as actions from '../../../common/actions.json'

export const joinGameAction = (gameId, userId) => ({
  type: actions.JOIN_GAME_REQUEST,
  socket: true,
  gameId,
  userId,
})

export const leaveGameAction = (gameId, userId) => ({
  type: actions.LEAVE_GAME_REQUEST,
  socket: true,
  gameId,
  userId,
})
