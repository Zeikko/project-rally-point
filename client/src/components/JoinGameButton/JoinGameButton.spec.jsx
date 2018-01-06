import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../test/snapshot'
import JoinGameButton from './JoinGameButton'
import game from '../../../../fixtures/game.json'

describe('JoinGameButton', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<JoinGameButton dispatch={() => {}} game={{ data: game }} />)
  })

  it('joins a game', () => {
    const dispatch = jest.fn()
    const wrapper = mount(<JoinGameButton dispatch={dispatch} game={{ data: game }} />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: 'JOIN_GAME_REQUEST',
        socket: true,
        gameId: 1
      },
    ])
  })
})
