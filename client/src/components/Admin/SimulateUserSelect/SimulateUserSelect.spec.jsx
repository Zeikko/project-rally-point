import React from 'react'
import { mount } from 'enzyme'
import { matchComponentToSnapshot } from '../../../test/snapshot'
import SimulateUserSelect from './SimulateUserSelect'

describe('SimulateUserSelect', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(<SimulateUserSelect dispatch={() => {}} />)
  })

  it('joins a game', () => {
    const dispatch = jest.fn()
    const wrapper = mount(<SimulateUserSelect dispatch={dispatch} />)
    wrapper.find('select').simulate('change')
    expect(dispatch.mock.calls[0]).toEqual([
      {
        type: 'SIMULATE_USER',
        id: 1,
      },
    ])
  })
})
