import * as actions from '../../../common/actions.json'

export const joinGameAction = (id) => ({
  type: actions.JOIN_GAME_REQUEST,
  socket: true,
  id
})

export const leaveGameAction = (id) => ({
  type: actions.LEAVE_GAME_REQUEST,
  socket: true,
  id
})
