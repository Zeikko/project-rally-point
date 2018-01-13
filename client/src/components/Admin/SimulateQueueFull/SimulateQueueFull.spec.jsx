import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../../test/snapshot'
import SimulateQueueFull from './SimulateQueueFull'
import game from '../../../../../fixtures/game.json'

describe('SimulateQueueFull', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<SimulateQueueFull dispatch={() => {}} gameState={{ game }} />)
  })

  it('joins a game', () => {
    const dispatch = jest.fn()
    const wrapper = mount(<SimulateQueueFull dispatch={dispatch} gameState={{ game }} />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: 'JOIN_GAME_REQUEST',
        socket: true,
        gameId: 1,
        userId: 1,
      },
    ])
  })
})
