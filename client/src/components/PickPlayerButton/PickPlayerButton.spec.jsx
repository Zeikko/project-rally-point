import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../test/snapshot'
import PickPlayerButton from './PickPlayerButton'
import normalUser from '../../../../fixtures/normal-user.json'
import game from '../../../../fixtures/game.json'
import player from '../../../../fixtures/player.json'
import gameStatuses from '../../../../common/game-statuses.json'
import playerRoles from '../../../../common/player-roles.json'
import actions from '../../../../common/actions.json'

describe('PickPlayerButton', () => {
  it('does not render when user is not in the game', () => {
    const players = []
    matchComponentToSnapshot(<PickPlayerButton
      dispatch={() => {}}
      player={player}
      game={game}
      players={players}
      user={normalUser}
    />)
  })

  it('does not render anything when it is not time to pick player', () => {
    const players = [{ ...player, id: 49 }]
    matchComponentToSnapshot(<PickPlayerButton
      dispatch={() => {}}
      player={player}
      game={game}
      players={players}
      user={normalUser}
    />)
  })

  it('renders button to pick a captain', () => {
    const captainPlayer = { ...player, team: 1, role: playerRoles.CAPTAIN }
    const players = [captainPlayer]
    matchComponentToSnapshot(<PickPlayerButton
      dispatch={() => {}}
      player={captainPlayer}
      game={{ ...game, teamWithTurnToPick: 1, status: gameStatuses.SQUAD_LEADER_PICK }}
      players={players}
      user={{ ...normalUser, id: 1 }}
    />)
  })

  it('renders button to pick a squad member', () => {
    const captainPlayer = { ...player, team: 1, role: playerRoles.SQUAD_LEADER }
    const players = [captainPlayer]
    matchComponentToSnapshot(<PickPlayerButton
      dispatch={() => {}}
      player={captainPlayer}
      game={{ ...game, teamWithTurnToPick: 1, status: gameStatuses.SQUAD_MEMBER_PICK }}
      players={players}
      user={{ ...normalUser, id: 1 }}
    />)
  })

  it('picks a captain', () => {
    const dispatch = jest.fn()
    const captainPlayer = { ...player, team: 1, role: playerRoles.CAPTAIN }
    const players = [captainPlayer]
    const wrapper = mount(<PickPlayerButton
      dispatch={dispatch}
      player={captainPlayer}
      game={{ ...game, teamWithTurnToPick: 1, status: gameStatuses.SQUAD_LEADER_PICK }}
      players={players}
      user={{ ...normalUser, id: 1 }}
    />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: actions.PICK_SQUAD_LEADER_REQUEST,
        socket: true,
        gameId: 1,
        team: 1,
        userId: 1,
        playerId: 1,
      },
    ])
  })

  it('picks a squad member', () => {
    const dispatch = jest.fn()
    const captainPlayer = { ...player, team: 1, role: playerRoles.SQUAD_LEADER }
    const players = [captainPlayer]
    const wrapper = mount(<PickPlayerButton
      dispatch={dispatch}
      player={captainPlayer}
      game={{ ...game, teamWithTurnToPick: 1, status: gameStatuses.SQUAD_MEMBER_PICK }}
      players={players}
      user={{ ...normalUser, id: 1 }}
    />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: actions.PICK_SQUAD_MEMBER_REQUEST,
        socket: true,
        gameId: 1,
        team: 1,
        userId: 1,
        playerId: 1,
      },
    ])
  })
})
