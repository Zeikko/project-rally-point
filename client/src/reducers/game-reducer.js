import actions from '../../../common/actions.json'
import initialState from '../initial-state'

export default function reducer(state = initialState.game, action) {
  switch (action.type) {
    case actions.GET_GAME_SUCCESS:
      return { ...state, data: action.data }
    default:
      return state
  }
}
