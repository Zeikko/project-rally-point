import actions from '../../../common/actions.json'
import initialState from '../initial-state'

export default function reducer(state = initialState.gameState, action) {
  switch (action.type) {
    case actions.GET_GAME_SUCCESS:
      return { ...state, game: action.data }
    default:
      return state
  }
}
