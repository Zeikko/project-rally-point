import { migrateRollback } from '../test/db'
import handleGame from './game'
import actions from '../../../common/actions.json'
import gameStatuses from '../../../common/game-statuses.json'

describe('gameHandler', () => {
  it('does nothing for non matching action', async () => {
    const io = { emit: jest.fn() }
    const socket = { emit: jest.fn() }
    return handleGame(io, socket, {
      type: 'non matching action type',
    })
  })

  describe('GET_GAME_REQUEST', () => {
    it('gets a game', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handleGame(io, socket, {
        type: actions.GET_GAME_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        data: {
          id: 1,
          status: gameStatuses.QUEUE,
          maxPlayers: 48,
          teamWithTurnToPick: null,
        },
        type: actions.GET_GAME_SUCCESS,
      }])
    })

    it('handles an error', async () => {
      await migrateRollback()
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handleGame(io, socket, {
        type: actions.GET_GAME_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_GAME_ERROR,
      }])
    })
  })

  describe('CREATE_GAME_REQUEST', () => {
    it('creates a game', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handleGame(io, socket, {
        type: actions.CREATE_GAME_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        data: {
          id: 2,
          status: gameStatuses.QUEUE,
          maxPlayers: 48,
          teamWithTurnToPick: null,
        },
        type: actions.GET_GAME_SUCCESS,
      }])
    })

    it('handles an error', async () => {
      await migrateRollback()
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handleGame(io, socket, {
        type: actions.CREATE_GAME_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.CREATE_GAME_ERROR,
      }])
    })
  })
})

