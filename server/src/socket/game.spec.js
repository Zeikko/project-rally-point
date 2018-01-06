import timekeeper from 'timekeeper'
import { migrateLatest, migrateRollback } from '../test/db'
import handleGame from './game'
import actions from '../../../common/actions.json'

timekeeper.freeze(new Date(1))

describe('gameHandler', () => {
  beforeEach(() => migrateLatest())
  afterEach(() => migrateRollback())

  it('does nothing for non matching action', () => {
    const io = { emit: jest.fn() }
    const socket = { emit: jest.fn() }
    handleGame(io, socket, {
      type: 'non matching action type',
    })
  })

  describe('GET_GAME_REQUEST', () => {
    it('gets a game', () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      return handleGame(io, socket, {
        type: actions.GET_GAME_REQUEST,
      })
        .then(() => {
          expect(socket.emit.mock.calls[0]).toEqual(['action', {
            data: {
              id: 1,
              status: 'queue',
            },
            type: actions.GET_GAME_SUCCESS,
          }])
        })
    })

    it('handles an error', () => migrateRollback().then(() => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      return handleGame(io, socket, {
        type: actions.GET_GAME_REQUEST,
      })
        .then(() => {
          expect(socket.emit.mock.calls[0]).toEqual(['action', {
            type: actions.GET_GAME_ERROR,
          }])
        })
    }))
  })
})

