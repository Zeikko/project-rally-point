import actions from '../../../common/actions.json'

export const createGameAction = () => ({
  type: actions.CREATE_GAME_REQUEST,
  socket: true,
})
