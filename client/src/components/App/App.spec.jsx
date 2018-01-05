import React from 'react'
import { AppWithoutConnect } from './App'
import { matchComponentToSnapshot } from '../../test/snapshot'
import initialState from '../../initial-state'

describe('App', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<AppWithoutConnect
      dispatch={() => {}}
      {...initialState}
    />)
  })
})
