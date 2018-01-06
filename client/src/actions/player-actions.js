import * as actions from '../../../common/actions.json'

export const getPlayersAction = (gameId) => ({
  type: actions.GET_PLAYERS_REQUEST,
  socket: true,
  gameId
})

