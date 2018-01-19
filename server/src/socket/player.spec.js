import db from '../db'
import normalUserFixture from '../../../fixtures/normal-user.json'
import handlePlayer from './player'
import actions from '../../../common/actions.json'
import gameStatuses from '../../../common/game-statuses.json'
import playerRoles from '../../../common/player-roles.json'

describe('playerHandler', () => {
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
        data: [{
          displayName: normalUserFixture.displayName,
          id: normalUserFixture.id,
          smallAvatarUrl: normalUserFixture.smallAvatarUrl,
          steamId: normalUserFixture.steamId,
          country: 'FI',
          role: playerRoles.NONE,
          team: null,
          squad: null,
        }],
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
        data: [{
          displayName: normalUserFixture.displayName,
          id: normalUserFixture.id,
          smallAvatarUrl: normalUserFixture.smallAvatarUrl,
          steamId: normalUserFixture.steamId,
          country: 'FI',
          role: playerRoles.NONE,
          team: null,
          squad: null,
        }],
      }])
    })

    it('throws an error when trying to join a full game', async () => {
      const { 0: game } = await db('game').insert({ status: gameStatuses.VOTE_CAPTAINS }).returning('*')
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
        data: [{
          displayName: normalUserFixture.displayName,
          id: normalUserFixture.id,
          smallAvatarUrl: normalUserFixture.smallAvatarUrl,
          steamId: normalUserFixture.steamId,
          country: 'FI',
          role: playerRoles.NONE,
          team: null,
          squad: null,
        }],
      }])
      expect(io.emit.mock.calls[1]).toEqual(['action', {
        type: actions.GET_GAME_SUCCESS,
        data: {
          id: 2,
          maxPlayers: 1,
          status: gameStatuses.VOTE_CAPTAINS,
          teamWithTurnToPick: null,
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
        .insert({ status: gameStatuses.VOTE_CAPTAINS })
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

  describe('PICK_SQUAD_LEADER_REQUEST', () => {
    it('picks a squad leader', async () => {
      const { 0: game } = await db('game').insert({
        status: gameStatuses.SQUAD_LEADER_PICK,
        teamWithTurnToPick: 1,
      }).returning('*')
      await db('user').insert(normalUserFixture)
      await db('player').insert({
        gameId: game.id,
        userId: 49,
        role: playerRoles.CAPTAIN,
        team: 1,
        squad: 1,
      })
      await db('player').insert({ gameId: game.id, userId: 1 })
      const io = { emit: jest.fn() }
      const socket = {
        emit: jest.fn(),
        userId: normalUserFixture.id,
      }
      await handlePlayer(io, socket, {
        type: actions.PICK_SQUAD_LEADER_REQUEST,
        gameId: game.id,
        userId: normalUserFixture.id,
        team: 1,
        playerId: 1,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.PICK_SQUAD_LEADER_SUCCESS,
      }])
      expect(io.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_PLAYERS_SUCCESS,
        data: [{
          displayName: 'Test user 1',
          id: 1,
          smallAvatarUrl: 'https://www.gravatar.com/avatar/1?s=32&d=identicon&r=PG',
          steamId: '1',
          country: 'C:',
          role: playerRoles.SQUAD_LEADER,
          team: 1,
          squad: 2,
        }, {
          displayName: normalUserFixture.displayName,
          id: normalUserFixture.id,
          smallAvatarUrl: normalUserFixture.smallAvatarUrl,
          steamId: normalUserFixture.steamId,
          country: 'FI',
          role: playerRoles.CAPTAIN,
          team: 1,
          squad: 1,
        }],
      }])
    })

    it('throws an error when user who is not in the game', async () => {
      const { 0: game } = await db('game').insert({
        status: gameStatuses.SQUAD_LEADER_PICK,
      }).returning('*')
      const io = { emit: jest.fn() }
      const socket = {
        emit: jest.fn(),
        userId: normalUserFixture.id,
      }
      await handlePlayer(io, socket, {
        type: actions.PICK_SQUAD_LEADER_REQUEST,
        gameId: game.id,
        userId: 1,
        team: 1,
        playerId: 1,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.PICK_SQUAD_LEADER_ERROR,
      }])
    })

    it('throws an error when the game is not in the squad leader pick', async () => {
      const { 0: game } = await db('game').insert({
        status: gameStatuses.QUEUE,
      }).returning('*')
      const io = { emit: jest.fn() }
      const socket = {
        emit: jest.fn(),
        userId: normalUserFixture.id,
      }
      await handlePlayer(io, socket, {
        type: actions.PICK_SQUAD_LEADER_REQUEST,
        gameId: game.id,
        userId: 1,
        team: 1,
        playerId: 1,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.PICK_SQUAD_LEADER_ERROR,
      }])
    })

    it('starts squad member pick', async () => {
      const { 0: game } = await db('game').insert({
        status: gameStatuses.SQUAD_LEADER_PICK,
        maxPlayers: 36,
        teamWithTurnToPick: 1,
      }).returning('*')
      await db('user').insert(normalUserFixture)
      await db('user').insert({ ...normalUserFixture, id: 50 })
      await db('player').insert({
        gameId: game.id,
        userId: 49,
        role: playerRoles.CAPTAIN,
        team: 1,
        squad: 1,
      })
      await db('player').insert({
        gameId: game.id,
        userId: 50,
        team: 2,
        squad: 1,
        role: playerRoles.SQUAD_LEADER,
      })
      await db('player').insert({
        gameId: game.id,
        userId: 1,
      })
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn(), userId: normalUserFixture.id }
      await handlePlayer(io, socket, {
        type: actions.PICK_SQUAD_LEADER_REQUEST,
        gameId: game.id,
        userId: 49,
        team: 1,
        playerId: 1,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.PICK_SQUAD_LEADER_SUCCESS,
      }])
      expect(io.emit.mock.calls[0]).toEqual(['action', {
        type: actions.GET_PLAYERS_SUCCESS,
        data: [{
          displayName: 'Test user 1',
          id: 1,
          smallAvatarUrl: 'https://www.gravatar.com/avatar/1?s=32&d=identicon&r=PG',
          steamId: '1',
          country: 'C:',
          role: playerRoles.SQUAD_LEADER,
          team: 1,
          squad: 2,
        }, {
          displayName: normalUserFixture.displayName,
          id: normalUserFixture.id,
          smallAvatarUrl: normalUserFixture.smallAvatarUrl,
          steamId: normalUserFixture.steamId,
          country: 'FI',
          role: playerRoles.CAPTAIN,
          team: 1,
          squad: 1,
        }, {
          displayName: normalUserFixture.displayName,
          id: 50,
          smallAvatarUrl: normalUserFixture.smallAvatarUrl,
          steamId: normalUserFixture.steamId,
          country: 'FI',
          role: playerRoles.SQUAD_LEADER,
          team: 2,
          squad: 1,
        }],
      }])
      expect(io.emit.mock.calls[1]).toEqual(['action', {
        type: actions.GET_GAME_SUCCESS,
        data: {
          id: game.id,
          maxPlayers: 36,
          status: gameStatuses.SQUAD_MEMBER_PICK,
          teamWithTurnToPick: 2,
        },
      }])
    })

    it('handles an error', async () => {
      const io = { emit: jest.fn() }
      const socket = { emit: jest.fn() }
      await handlePlayer(io, socket, {
        type: actions.PICK_SQUAD_LEADER_REQUEST,
      })
      expect(socket.emit.mock.calls[0]).toEqual(['action', {
        type: actions.PICK_SQUAD_LEADER_ERROR,
      }])
    })
  })
})

