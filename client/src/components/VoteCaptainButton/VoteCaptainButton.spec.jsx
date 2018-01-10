import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../test/snapshot'
import VoteCaptainButton from './VoteCaptainButton'
import game from '../../../../fixtures/game.json'
import normalUser from '../../../../fixtures/normal-user.json'
import initialState from '../../initial-state'
import gameStatuses from '../../../../common/game-statuses.json'

describe('VoteCaptainButton', () => {
  it('does not render when not voting for a captain', () => {
    matchComponentToSnapshot(<VoteCaptainButton
      dispatch={() => {}}
      player={normalUser}
      gameState={{ game }}
      captainVotesState={initialState.captainVotesState}
      userState={initialState.userState}
    />)
  })

  it('renders button when voting for a captain', () => {
    matchComponentToSnapshot(<VoteCaptainButton
      dispatch={() => {}}
      player={normalUser}
      gameState={{ game: { ...game, status: gameStatuses.VOTE_CAPTAINS } }}
      captainVotesState={initialState.captainVotesState}
      userState={{ isLoading: false, user: normalUser }}
    />)
  })

  it('votes a captain', () => {
    const dispatch = jest.fn()
    const wrapper = mount(<VoteCaptainButton
      dispatch={() => {}}
      player={normalUser}
      gameState={{ game: { ...game, status: gameStatuses.VOTE_CAPTAINS } }}
      captainVotesState={initialState.captainVotesState}
      userState={{ isLoading: false, user: normalUser }}
    />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: 'VOTE_CAPTAIN_REQUEST',
        socket: true,
        gameId: 1,
      },
    ])
  })
})
