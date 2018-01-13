import logger from '../logger'
import db from '../db'
import actions from '../../../common/actions.json'
import { startSquadLeaderPick, getGameStatus, shouldStartSquadLeaderPick } from '../helpers/game'
import gameStatuses from '../../../common/game-statuses.json'
import { getIsPlayerInGame, pickPlayer, getGamePlayers } from '../helpers/player'
import playerRoles from '../../../common/player-roles.json'

export default function handleCaptainVote(io, socket, action) {
  switch (action.type) {
    case actions.GET_CAPTAIN_VOTES_REQUEST:
      return getCaptainVotes(io, socket, action.gameId)
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
    logger.exception(error)
    socket.emit('action', { type: actions.GET_CAPTAIN_VOTES_ERROR })
  }
}

async function captainVoteRequest(io, socket, gameId, votedUserId) {
  try {
    const { status } = await getGameStatus(gameId)
    if (status !== gameStatuses.VOTE_CAPTAINS) {
      throw Error('Game is not in captain vote')
    }
    const isVoterInGame = await getIsPlayerInGame(socket.userId, gameId)
    if (!isVoterInGame) {
      throw Error('Voter is not in the game')
    }
    const isVotedInGame = await getIsPlayerInGame(votedUserId, gameId)
    if (!isVotedInGame) {
      throw Error('Voted is not in the game')
    }
    await db('captainVote').insert({
      gameId,
      voterId: socket.userId,
      votedId: votedUserId,
    })
    socket.emit('action', { type: actions.CAPTAIN_VOTE_SUCCESS })
    await broadcastCaptainVotesUpdate(io, gameId)
    const willStartSquadLeaderPick = await shouldStartSquadLeaderPick(gameId)
    if (willStartSquadLeaderPick) {
      const { 0: { votedId: teamOneCaptainId }, 1: { votedId: teamTwoCaptainId } } = await db('captainVote')
        .select('votedId')
        .where({ gameId })
        .orderByRaw('COUNT("votedId") desc')
        .groupBy('votedId')
      await pickPlayer(gameId, teamOneCaptainId, 1, 1, playerRoles.CAPTAIN)
      await pickPlayer(gameId, teamTwoCaptainId, 2, 1, playerRoles.CAPTAIN)
      const game = await startSquadLeaderPick(gameId)
      io.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
      const players = await getGamePlayers(gameId)
      io.emit('action', { type: actions.GET_PLAYERS_SUCCESS, data: players })
    }
  } catch (error) {
    logger.exception(error)
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

