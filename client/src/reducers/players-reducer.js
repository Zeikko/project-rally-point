import actions from '../../../common/actions.json'
import initialState from '../initial-state'

export default function reducer(state = initialState.players, action) {
  switch (action.type) {
    case actions.GET_PLAYERS_SUCCESS:
      return { ...state, data: action.data }
    default:
      return state
  }
}
