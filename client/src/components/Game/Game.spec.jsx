import React from 'react'
import { matchComponentToSnapshot } from '../../test/snapshot'
import Game from './Game'
import game from '../../../../fixtures/game.json'
import normalUser from '../../../../fixtures/normal-user.json'


describe('Game', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<Game
      dispatch={() => {}}
      game={{ data: null }}
      players={{ data: null }}
      user={{ isLoading: false, data: null }}
    />)
  })

  it('renders correctly when player is not in the game', () => {
    matchComponentToSnapshot(<Game
      dispatch={() => {}}
      game={{ data: game }}
      players={{ data: null }}
      user={{ isLoading: false, data: normalUser }}
    />)
  })

  it('renders correctly when player is in the game', () => {
    matchComponentToSnapshot(<Game
      dispatch={() => {}}
      game={{ data: game }}
      players={{ data: [normalUser] }}
      user={{ isLoading: false, data: normalUser }}
    />)
  })

})
