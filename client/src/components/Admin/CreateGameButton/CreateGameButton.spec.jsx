import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../../test/snapshot'
import CreateGameButton from './CreateGameButton'
import game from '../../../../../fixtures/game.json'

describe('CreateGameButton', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<CreateGameButton dispatch={() => {}} />)
  })

  it('creates a game', () => {
    const dispatch = jest.fn()
    const wrapper = mount(<CreateGameButton dispatch={dispatch} />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: 'CREATE_GAME_REQUEST',
        socket: true,
      },
    ])
  })
})
