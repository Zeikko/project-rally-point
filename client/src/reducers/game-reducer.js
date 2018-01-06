import actions from '../../../common/actions.json'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_GAME_SUCCESS:
      return { ...state, data: action.data }
    default:
      return state
  }
}
