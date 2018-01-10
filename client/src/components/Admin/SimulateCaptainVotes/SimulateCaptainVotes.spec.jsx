import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../../test/snapshot'
import SimulateCaptainVotes from './SimulateCaptainVotes'
import game from '../../../../../fixtures/game.json'

describe('SimulateCaptainVotes', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<SimulateCaptainVotes dispatch={() => {}} gameState={{ game }} />)
  })

  it('votes a captain', () => {
    const dispatch = jest.fn()
    const wrapper = mount(<SimulateCaptainVotes dispatch={dispatch} gameState={{ game }} />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toMatchObject([
      {
        type: 'CAPTAIN_VOTE_REQUEST',
        socket: true,
        gameId: 1,
        userId: 1,
        playerId: expect.stringMatching(/\d{1,2}/)
      },
    ])
  })
})
