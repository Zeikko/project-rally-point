import React from 'react'
import AdminPanel from './AdminPanel'
import { matchComponentToSnapshot } from '../../../test/snapshot'
import initialState from '../../../initial-state'
import adminUser from '../../../../../fixtures/admin-user.json'
import normalUser from '../../../../../fixtures/normal-user.json'

describe('AdminPanel', () => {
  it('renders initial state correctly', () => {
    matchComponentToSnapshot(<AdminPanel
      dispatch={() => {}}
      {...initialState}
      userState={{ isLoading: false, user: normalUser }}
    />)
  })

  it('renders correctly admin user', () => {
    matchComponentToSnapshot(<AdminPanel
      dispatch={() => {}}
      {...initialState}
      userState={{ isLoading: false, user: adminUser }}
    />)
  })
})
