import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../../test/snapshot'
import SimulateQueueEmpty from './SimulateQueueEmpty'
import game from '../../../../../fixtures/game.json'

describe('SimulateQueueEmpty', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<SimulateQueueEmpty dispatch={() => {}} game={{ data: game }} />)
  })

  it('joins a game', () => {
    const dispatch = jest.fn()
    const wrapper = mount(<SimulateQueueEmpty dispatch={dispatch} game={{ data: game }} />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: 'LEAVE_GAME_REQUEST',
        socket: true,
        gameId: 1,
        userId: 1,
      },
    ])
  })
})
