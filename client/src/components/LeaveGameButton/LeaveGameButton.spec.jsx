import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../test/snapshot'
import LeaveGameButton from './LeaveGameButton'
import game from '../../../../fixtures/game.json'

describe('LeaveGameButton', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<LeaveGameButton dispatch={() => {}} game={{ data: game }} />)
  })

  it('leaves a game', () => {
    const dispatch = jest.fn()
    const wrapper = mount(<LeaveGameButton dispatch={dispatch} game={{ data: game }} />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: 'LEAVE_GAME_REQUEST',
        socket: true,
        gameId: 1,
      },
    ])
  })
})
