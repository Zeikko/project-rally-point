import db from '../db'
import { migrateRollback } from '../test/db'
import handleCaptainVote from './captain-vote'
import actions from '../../../common/actions.json'
import gameStatuses from '../../../common/game-statuses.json'

describe('gameHandler', () => {
  it('does nothing for non matching action', async () => {
    const io = { emit: jest.fn() }
    const socket = { emit: jest.fn() }
    return handleCaptainVote(io, socket, {
      type: 'non matching action type',
    })
  })

  describe('GET_CAPTAIN_VOTES_REQUEST', () => {
    it('gets a game', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await db('captainVote').insert({
        gameId: 1,
        voterId: 1,
        votedId: 2,
      })
      await handleCaptainVote(io, socket, {
        type: actions.GET_CAPTAIN_VOTES_REQUEST,
        gameId: 1,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        captainVotes: [{
          id: 1,
          gameId: 1,
          voterId: 1,
          votedId: 2,
        }],
        type: actions.GET_CAPTAIN_VOTES_SUCCESS,
      }])
    })

    it('handles an error', async () => {
      await migrateRollback()
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handleCaptainVote(io, socket, {
        type: actions.GET_CAPTAIN_VOTES_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_CAPTAIN_VOTES_ERROR,
      }])
    })
  })

  describe('CAPTAIN_VOTE_REQUEST', () => {
    it('votes captain', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn(), userId: 1 }
      await db('player').insert([
        { userId: 1, gameId: 1 },
        { userId: 2, gameId: 1 },
      ])
      await db('game').update({ status: gameStatuses.VOTE_CAPTAINS })
      await handleCaptainVote(io, socket, {
        type: actions.CAPTAIN_VOTE_REQUEST,
        gameId: 1,
        playerId: 2,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.CAPTAIN_VOTE_SUCCESS,
      }])
    })

    it('throws an error when game is not in captain vote', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn(), userId: 1 }
      await db('player').insert([
        { userId: 1, gameId: 1 },
        { userId: 2, gameId: 1 },
      ])
      await handleCaptainVote(io, socket, {
        type: actions.CAPTAIN_VOTE_REQUEST,
        gameId: 1,
        playerId: 2,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.CAPTAIN_VOTE_ERROR,
      }])
    })


    it('throws an error when voting user is not in the game', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn(), userId: 1 }
      await db('player').insert({ userId: 2, gameId: 1 })
      await db('game').update({ status: gameStatuses.VOTE_CAPTAINS })
      await handleCaptainVote(io, socket, {
        type: actions.CAPTAIN_VOTE_REQUEST,
        gameId: 1,
        playerId: 2,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.CAPTAIN_VOTE_ERROR,
      }])
    })

    it('throws an error when voted user is not in the game', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn(), userId: 1 }
      await db('player').insert({ userId: 1, gameId: 1 })
      await db('game').update({ status: gameStatuses.VOTE_CAPTAINS })
      await handleCaptainVote(io, socket, {
        type: actions.CAPTAIN_VOTE_REQUEST,
        gameId: 1,
        playerId: 2,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.CAPTAIN_VOTE_ERROR,
      }])
    })

    it('starts squad leader pick', async () => {
      const { 0: game } = await db('game').insert({ maxPlayers: 2, status: gameStatuses.VOTE_CAPTAINS }).returning('*')
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn(), userId: 1 }
      await db('player').insert([
        { userId: 1, gameId: game.id },
        { userId: 2, gameId: game.id },
      ])
      await db('captainVote').insert([
        {
          gameId: game.id,
          votedId: 1,
          voterId: 2,
        },
      ])
      await handleCaptainVote(io, socket, {
        type: actions.CAPTAIN_VOTE_REQUEST,
        gameId: game.id,
        playerId: 2,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.CAPTAIN_VOTE_SUCCESS,
      }])
      expect(io.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_CAPTAIN_VOTES_SUCCESS,
        captainVotes: [{
          gameId: 2,
          id: 1,
          votedId: 1,
          voterId: 2,
        }, {
          gameId: 2,
          id: 2,
          votedId: 2,
          voterId: 1,
        }],
      }])
      expect(io.emit.mock.calls[1]).toEqual(['action', {
        type: actions.GET_GAME_SUCCESS,
        data: {
          id: 2,
          maxPlayers: 2,
          status: gameStatuses.SQUAD_LEADER_PICK,
          teamWithTurnToPick: 1,
        },
      }])
    })


    it('handles an error', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handleCaptainVote(io, socket, {
        type: actions.CAPTAIN_VOTE_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.CAPTAIN_VOTE_ERROR,
      }])
    })
  })
})

