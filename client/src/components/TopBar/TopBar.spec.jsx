import React from 'react'
import TopBar from './TopBar'
import { matchComponentToSnapshot } from '../../test/snapshot'
import initialState from '../../initial-state'

describe('TopBar', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<TopBar
      dispatch={() => {}}
      userState={initialState.userState}
    />)
  })
})

