import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../test/snapshot'
import Team from './Team'
import player from '../../../../fixtures/player.json'

describe('Team', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<Team team={1} players={[{ ...player, team: 1 }]} />)
  })
})
