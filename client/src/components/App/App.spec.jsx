import React from 'react'
import { AppWithoutConnect } from './App'
import { matchComponentToSnapshot } from '../../test/snapshot'
import initialState from '../../initial-state'
import game from '../../../../fixtures/game.json'

describe('App', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<AppWithoutConnect
      dispatch={() => {}}
      {...initialState}
    />)
  })

  it('renders correctly with game', () => {
    matchComponentToSnapshot(<AppWithoutConnect
      dispatch={() => {}}
      {...initialState}
      gameState={{ game }}
    />)
  })
})
