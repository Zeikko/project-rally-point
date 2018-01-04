import React from 'react'
import HelloWorld from './HelloWorld'
import { matchComponentToSnapshot } from '../../snapshot'

describe('HelloWorld', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<HelloWorld />)
  })
})