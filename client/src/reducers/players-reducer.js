import actions from '../../../common/actions.json'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_PLAYERS_SUCCESS:
      return { ...state, data: action.data }
    default:
      return state
  }
}
