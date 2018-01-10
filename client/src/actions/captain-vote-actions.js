import * as actions from '../../../common/actions.json'
console.log(actions)
export const voteCaptainAction = (gameId, playerId) => ({
  type: actions.CAPTAIN_VOTE_REQUEST,
  socket: true,
  playerId,
  gameId
})
