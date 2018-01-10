import logger from '../logger'
import db from '../db'
import actions from '../../../common/actions.json'
import { startCaptainVote, getGameStatus, shouldStartCaptainVote, createNewGame } from '../helpers/game'
import gameStatuses from '../../../common/game-statuses'

export default function handleCaptainVote(io, socket, action) {
  switch (action.type) {
    case actions.CAPTAIN_VOTE_REQUEST:
      return voteCaptainRequest(io, socket, action.gameId, action.playerId)
    default:
      return null
  }
}

async function voteCaptainRequest(io, socket, gameId, playerId) {
  try {
    console.log(gameId)
    const { status } = await getGameStatus(gameId)
    if (status !== gameStatuses.VOTE_CAPTAINS) {
      throw Error('Game is not in captain vote')
    }
    console.log(gameId, socket.userId, playerId)
    await db('captainVote').insert({
      gameId,
      voterId: socket.userId,
      votedId: playerId
    })
    socket.emit('action', { type: actions.CAPTAIN_VOTE_SUCCESS })
    /*await broadcastGamePlayersUpdate(io, action.gameId)
    const willStartCaptainVote = await shouldStartCaptainVote(gameId)
    if (willStartCaptainVote) {
      await createNewGame()
      const game = await startCaptainVote(gameId)
      io.emit('action', { type: actions.GET_GAME_SUCCESS, data: game })
    }*/
    const captainVotes = await db('captainVote')
      .select('*')
      .where({
        gameId
      })
    io.emit('action', { type: actions.GET_CAPTAIN_VOTES_SUCCESS, captainVotes })
  } catch (error) {
    console.log(error)
    logger.error(error)
    socket.emit('action', { type: actions.CAPTAIN_VOTE_ERROR })
  }
}

