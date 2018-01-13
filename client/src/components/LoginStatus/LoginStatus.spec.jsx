import React from 'react'
import { matchComponentToSnapshot } from '../../test/snapshot'
import LoginStatus from './LoginStatus'
import initialState from '../../initial-state'
import normalUser from '../../../../fixtures/normal-user.json'

describe('LoginStatus', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<LoginStatus
      dispatch={() => {}}
      userState={initialState.userState}
    />)
  })

  it('renders loading state correctly', () => {
    matchComponentToSnapshot(<LoginStatus
      dispatch={() => {}}
      userState={{ isLoading: true }}
    />)
  })

  it('renders logged in state correctly', () => {
    matchComponentToSnapshot(<LoginStatus
      dispatch={() => {}}
      userState={{
        isLoading: false,
        user: normalUser,
      }}
    />)
  })
})
