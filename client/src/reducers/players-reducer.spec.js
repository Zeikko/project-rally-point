import playersReducer from './players-reducer'
import actions from '../../../common/actions.json'
import normalUser from '../../../fixtures/normal-user.json'
import initialState from '../initial-state'

describe('playersReducer', () => {
  it('returns old state', () => {
    const nextState = playersReducer(undefined, {
      type: 'irrelevant action',
    })
    expect(nextState).toEqual(initialState.playersState)
  })

  it('updates players', () => {
    const nextState = playersReducer(undefined, {
      type: actions.GET_PLAYERS_SUCCESS,
      data: [normalUser],
    })
    expect(nextState).toEqual({ players: [normalUser] })
  })
})
