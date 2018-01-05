import React from 'react'
import { matchComponentToSnapshot } from '../../test/snapshot'
import LoginStatus from './LoginStatus'
import initialState from '../../initial-state'

describe('LoginStatus', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<LoginStatus
      dispatch={() => {}}
      user={initialState.user}
    />)
  })

  it('renders loading state correctly', () => {
    matchComponentToSnapshot(<LoginStatus
      dispatch={() => {}}
      user={{ isLoading: true }}
    />)
  })

  it('renders logged in state correctly', () => {
    matchComponentToSnapshot(<LoginStatus
      dispatch={() => {}}
      user={{
        isLoading: false,
        data: {
          id: 1,
          displayName: 'Test user',
          smallAvatarUrl: 'http://avatar.test/small',
          profileUrl: 'http://profile.test/user',
          steamId: '123'
        }
      }}
    />)
  })
})
