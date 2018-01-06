import React from 'react'
import LoginButton from './LoginButton'
import { matchComponentToSnapshot } from '../../test/snapshot'

describe('LoginButton', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<LoginButton />)
  })
})
