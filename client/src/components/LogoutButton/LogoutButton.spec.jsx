import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../test/snapshot'
import LogoutButton from './LogoutButton'

describe('LogoutButton', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<LogoutButton dispatch={() => {}} />)
  })

  it('logs user out', () => {
    const dispatch = jest.fn()
    const wrapper = mount(<LogoutButton dispatch={dispatch} />)
    wrapper.find('button').simulate('click')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: 'LOGOUT_REQUEST',
      },
    ])
  })
})
