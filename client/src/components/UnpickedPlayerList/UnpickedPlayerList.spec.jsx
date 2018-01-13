import React from 'react'
import { matchComponentToSnapshot } from '../../test/snapshot'
import UnpickedPlayerList from './UnpickedPlayerList'
import normalUser from '../../../../fixtures/normal-user.json'
import game from '../../../../fixtures/game.json'

describe('UnpickedPlayerList', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<UnpickedPlayerList
      dispatch={() => {}}
      gameState={{ game }}
      playersState={{ players: [] }}
      captainVotesState={{ captainVotes: [] }}
      userState={{ isLoading: false, user: null }}
    />)
  })

  it('renders a player correctly', () => {
    matchComponentToSnapshot(<UnpickedPlayerList
      dispatch={() => {}}
      gameState={{ game }}
      playersState={{ players: [normalUser] }}
      captainVotesState={{ captainVotes: [] }}
      userState={{ isLoading: false, user: null }}
    />)
  })
})
