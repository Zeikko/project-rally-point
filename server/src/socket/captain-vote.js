import logger from '../logger'
import db from '../db'
import actions from '../../../common/actions.json'
import { startSquadLeaderPick, getGameStatus, shouldStartSquadLeaderPick } from '../helpers/game'
import gameStatuses from '../../../common/game-statuses.json'

export default function handleCaptainVote(io, socket, action) {
  switch (action.type) {
    case actions.CAPTAIN_VOTE_REQUEST:
      return captainVoteRequest(io, socket, action.gameId, action.playerId)
    default:
      return null
  }
}

export async function getCaptainVotes(io, socket, gameId) {
  try {
    const captainVotes = await db('captainVote')
      .select('*')
      .where({ gameId })
    socket.emit('action', { type: actions.GET_CAPTAIN_VOTES_SUCCESS, captainVotes })
  } catch (error) {
    logger.error(error)
    socket.emit('action', { type: actions.GET_CAPTAIN_VOTES_ERROR })
  }
}

async function captainVoteRequest(io, socket, gameId, playerId) {
  try {
    const { status } = await getGameStatus(gameId)
    if (status !== gameStatuses.VOTE_CAPTAINS) {
      throw Error('Game is not in captain vote')
    }
    await db('captainVote').insert({
      gameId,
      voterId: socket.userId,
      votedId: playerId,
    })
    socket.emit('action', { type: actions.CAPTAIN_VOTE_SUCCESS })
    await broadcastCaptainVotesUpdate(io, gameId)
    const willStartSquadLeaderPick = await shouldStartSquadLeaderPick(gameId)
    if (willStartSquadLeaderPick) {
      const game = await startSquadLeaderPick(gameId)
      io.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
    }
  } catch (error) {
    logger.error(error)
    socket.emit('action', { type: actions.CAPTAIN_VOTE_ERROR })
  }
}

async function broadcastCaptainVotesUpdate(io, gameId) {
  const captainVotes = await db('captainVote')
    .select('*')
    .where({
      gameId,
    })
  io.emit('action', { type: actions.GET_CAPTAIN_VOTES_SUCCESS, captainVotes })
}

