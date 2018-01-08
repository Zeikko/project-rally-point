import timekeeper from 'timekeeper'
import db from '../db'
import { migrateLatest, migrateRollback } from '../test/db'
import normalUserFixture from '../../../fixtures/normal-user.json'
import handlePlayer from './player'
import actions from '../../../common/actions.json'

timekeeper.freeze(new Date(1))

describe('playerHandler', () => {
  beforeEach(() => migrateLatest())
  afterEach(() => migrateRollback())

  it('does nothing for non matching action', () => {
    const io = { emit: jest.fn() }
    const socket = { emit: jest.fn() }
    handlePlayer(io, socket, {
      type: 'non matching action type',
    })
  })

  describe('GET_PLAYERS_REQUEST', () => {
    beforeEach(() => db('user').insert(normalUserFixture)
      .then(() => db('player').insert({
        gameId: 1,
        userId: normalUserFixture.id,
      })))

    it('gets players', () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      return handlePlayer(io, socket, {
        type: actions.GET_PLAYERS_REQUEST,
        gameId: 1,
      })
        .then(() => {
          expect(socket.emit.mock.calls[0]).toEqual(['action', {
            type: actions.GET_PLAYERS_SUCCESS,
            data: [normalUserFixture],
          }])
        })
    })

    it('handles an error', () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      return handlePlayer(io, socket, {
        type: actions.GET_PLAYERS_REQUEST,
      })
        .then(() => {
          expect(socket.emit.mock.calls[0]).toEqual(['action', {
            type: actions.GET_PLAYERS_ERROR,
          }])
        })
    })
  })

  describe('JOIN_GAME_REQUEST', () => {
    beforeEach(() => db('user').insert(normalUserFixture))

    it('joins a game', () => {
      const io = { emit: jest.fn() }
      const socket = {
        emit: jest.fn(),
        userId: normalUserFixture.id,
      }
      return handlePlayer(io, socket, {
        type: actions.JOIN_GAME_REQUEST,
        gameId: 1,
      })
        .then(() => {
          expect(socket.emit.mock.calls[0]).toEqual(['action', {
            type: actions.JOIN_GAME_SUCCESS,
          }])
          expect(io.emit.mock.calls[0]).toEqual(['action', {
            type: actions.GET_PLAYERS_SUCCESS,
            data: [normalUserFixture],
          }])
        })
    })

    it('handles an error', () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      return handlePlayer(io, socket, {
        type: actions.JOIN_GAME_REQUEST,
      })
        .then(() => {
          expect(socket.emit.mock.calls[0]).toEqual(['action', {
            type: actions.JOIN_GAME_ERROR,
          }])
        })
    })
  })

  describe('LEAVE_GAME_REQUEST', () => {
    beforeEach(() => db('user').insert(normalUserFixture)
      .then(() => db('player').insert({
        gameId: 1,
        userId: normalUserFixture.id,
      })))

    it('leaves a game', () => {
      const io = { emit: jest.fn() }
      const socket = {
        emit: jest.fn(),
        userId: normalUserFixture.id,
      }
      return handlePlayer(io, socket, {
        type: actions.LEAVE_GAME_REQUEST,
        gameId: 1,
      })
        .then(() => {
          expect(socket.emit.mock.calls[0]).toEqual(['action', {
            type: actions.LEAVE_GAME_SUCCESS,
          }])
          expect(io.emit.mock.calls[0]).toEqual(['action', {
            type: actions.GET_PLAYERS_SUCCESS,
            data: [],
          }])
        })
    })

    it('handles an error', () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      return handlePlayer(io, socket, {
        type: actions.LEAVE_GAME_REQUEST,
      })
        .then(() => {
          expect(socket.emit.mock.calls[0]).toEqual(['action', {
            type: actions.LEAVE_GAME_ERROR,
          }])
        })
    })
  })
})

