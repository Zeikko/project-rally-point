import * as actions from '../../../common/actions.json'

export const voteCaptainAction = (gameId, playerId, userId) => ({
  type: actions.CAPTAIN_VOTE_REQUEST,
  socket: true,
  playerId,
  gameId,
  userId,
})
