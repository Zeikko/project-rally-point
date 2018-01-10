import React from 'react'
import { matchComponentToSnapshot } from '../../test/snapshot'
import Game from './Game'
import game from '../../../../fixtures/game.json'
import normalUser from '../../../../fixtures/normal-user.json'
import initialState from '../../initial-state'

describe('Game', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<Game
      dispatch={() => {}}
      gameState={initialState.gameState}
      playersState={initialState.playersState}
      userState={initialState.userState}
    />)
  })

  it('renders correctly when player is not in the game', () => {
    matchComponentToSnapshot(<Game
      dispatch={() => {}}
      gameState={{ game }}
      playersState={initialState.playersState}
      userState={{ isLoading: false, user: normalUser }}
    />)
  })

  it('renders correctly when player is in the game', () => {
    matchComponentToSnapshot(<Game
      dispatch={() => {}}
      gameState={{ game }}
      playersState={{ players: [normalUser] }}
      userState={{ isLoading: false, user: normalUser }}
    />)
  })
})
