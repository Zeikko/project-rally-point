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

  it('does nothing for non matching action', async () => {
    const io = { emit: jest.fn() }
    const socket = { emit: jest.fn() }
    return handlePlayer(io, socket, {
      type: 'non matching action type',
    })
  })

  describe('GET_PLAYERS_REQUEST', async () => {
    beforeEach(async () => {
      await db('user').insert(normalUserFixture)
      return db('player').insert({
        gameId: 1,
        userId: normalUserFixture.id,
      })
    })

    it('gets players', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handlePlayer(io, socket, {
        type: actions.GET_PLAYERS_REQUEST,
        gameId: 1,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_PLAYERS_SUCCESS,
        data: [normalUserFixture],
      }])
    })

    it('handles an error', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handlePlayer(io, socket, {
        type: actions.GET_PLAYERS_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_PLAYERS_ERROR,
      }])
    })
  })

  describe('JOIN_GAME_REQUEST', () => {
    beforeEach(() => db('user').insert(normalUserFixture))

    it('joins a game', async () => {
      const io = { emit: jest.fn() }
      const socket = {
        emit: jest.fn(),
        userId: normalUserFixture.id,
      }
      await handlePlayer(io, socket, {
        type: actions.JOIN_GAME_REQUEST,
        gameId: 1,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.JOIN_GAME_SUCCESS,
      }])
      expect(io.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_PLAYERS_SUCCESS,
        data: [normalUserFixture],
      }])
    })

    it('throws an error when trying to join a full game', async () => {
      const { 0: game } = await db('game').insert({ status: 'voting captains' }).returning('*')
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn(), userId: normalUserFixture.id }
      await handlePlayer(io, socket, {
        type: actions.JOIN_GAME_REQUEST,
        gameId: game.id,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.JOIN_GAME_ERROR,
      }])
    })

    it('starts captain vote', async () => {
      const { 0: game } = await db('game').insert({ maxPlayers: 1 }).returning('*')
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn(), userId: normalUserFixture.id }
      await handlePlayer(io, socket, {
        type: actions.JOIN_GAME_REQUEST,
        gameId: game.id,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.JOIN_GAME_SUCCESS,
      }])
      expect(io.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_PLAYERS_SUCCESS,
        data: [normalUserFixture],
      }])
      expect(io.emit.mock.calls[1]).toEqual(['action', {
        type: actions.GET_GAME_SUCCESS,
        data: {
          id: 2,
          maxPlayers: 1,
          status: 'voting captains',
        },
      }])
    })


    it('handles an error', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handlePlayer(io, socket, {
        type: actions.JOIN_GAME_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.JOIN_GAME_ERROR,
      }])
    })
  })

  describe('LEAVE_GAME_REQUEST', () => {
    beforeEach(async () => {
      await db('user').insert(normalUserFixture)
      return db('player').insert({
        gameId: 1,
        userId: normalUserFixture.id,
      })
    })

    it('leaves a game', async () => {
      const io = { emit: jest.fn() }
      const socket = {
        emit: jest.fn(),
        userId: normalUserFixture.id,
      }
      await handlePlayer(io, socket, {
        type: actions.LEAVE_GAME_REQUEST,
        gameId: 1,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.LEAVE_GAME_SUCCESS,
      }])
      expect(io.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_PLAYERS_SUCCESS,
        data: [],
      }])
    })

    it('throws an error when trying to join a full game', async () => {
      const { 0: game } = await db('game')
        .insert({ status: 'voting captains' })
        .returning('*')
      await db('player')
        .insert({ gameId: game.id, userId: normalUserFixture.id })
        .returning('*')
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn(), userId: normalUserFixture.id }
      await handlePlayer(io, socket, {
        type: actions.LEAVE_GAME_REQUEST,
        gameId: game.id,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.LEAVE_GAME_ERROR,
      }])
    })

    it('handles an error', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handlePlayer(io, socket, {
        type: actions.LEAVE_GAME_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.LEAVE_GAME_ERROR,
      }])
    })
  })
})

