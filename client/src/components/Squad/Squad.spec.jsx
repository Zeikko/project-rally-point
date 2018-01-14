import React from 'react'
import { matchComponentToSnapshot } from '../../test/snapshot'
import Squad from './Squad'
import player from '../../../../fixtures/player.json'

describe('Squad', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<Squad squad={1} players={[{ ...player, squad: 1 }]} />)
  })
})
