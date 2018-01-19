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

export const pickSquadLeaderAction = (gameId, playerId, team, userId) => ({
  type: actions.PICK_SQUAD_LEADER_REQUEST,
  socket: true,
  gameId,
  playerId,
  team,
  userId
})

export const pickSquadMemberAction = (gameId, playerId, team, userId) => ({
  type: actions.PICK_SQUAD_MEMBER_REQUEST,
  socket: true,
  gameId,
  playerId,
  team,
  userId
})
