import React from 'react'
import { matchComponentToSnapshot } from '../../test/snapshot'
import UnpickedPlayerList from './UnpickedPlayerList'
import normalUser from '../../../../fixtures/normal-user.json'
import game from '../../../../fixtures/game.json'
import player from '../../../../fixtures/player.json'

describe('UnpickedPlayerList', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<UnpickedPlayerList
      dispatch={() => {}}
      game={game}
      players={[]}
      captainVotes={[]}
      user={normalUser}
    />)
  })

  it('renders a player correctly', () => {
    matchComponentToSnapshot(<UnpickedPlayerList
      dispatch={() => {}}
      game={game}
      players={[player]}
      captainVotes={[]}
      user={normalUser}
    />)
  })
})
