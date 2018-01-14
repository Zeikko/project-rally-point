import userReducer from './user-reducer'
import actions from '../../../common/actions.json'
import normalUser from '../../../fixtures/normal-user.json'
import initialState from '../initial-state'

describe('userReducer', () => {
  it('returns old state', () => {
    const nextState = userReducer(undefined, {
      type: 'irrelevant action',
    })
    expect(nextState).toEqual(initialState.userState)
  })

  it('simulates user', () => {
    const nextState = userReducer(undefined, {
      type: actions.SIMULATE_USER,
      id: 1,
    })
    expect(nextState).toMatchSnapshot()
  })
})
