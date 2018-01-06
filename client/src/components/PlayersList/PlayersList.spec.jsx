import React from 'react'
import { matchComponentToSnapshot } from '../../test/snapshot'
import PlayersList from './PlayersList'
import normalUser from '../../../../fixtures/normal-user.json'
import game from '../../../../fixtures/game.json'

describe('PlayersList', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<PlayersList
      dispatch={() => {}}
      game={{ data: game }}
      players={{ data: [] }}
    />)
  })

  it('renders a player correctly', () => {
    matchComponentToSnapshot(<PlayersList
      dispatch={() => {}}
      game={{ data: game }}
      players={{ data: [normalUser] }}
    />)
  })
})
