import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../test/snapshot'
import Player from './Player'
import player from '../../../../fixtures/player.json'
import playerRoles from '../../../../common/player-roles.json'

describe('Player', () => {
  it('renders player without a role correctly', () => {
    matchComponentToSnapshot(<Player player={player} />)
  })

  it('renders player with a role correctly', () => {
    matchComponentToSnapshot(<Player player={{ ...player, role: playerRoles.CAPTAIN }} />)
  })
})
