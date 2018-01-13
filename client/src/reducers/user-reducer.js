import initialState from '../initial-state'
import actions from '../../../common/actions.json'

export default function (state = initialState.userState, action) {
  switch (action.type) {
    case actions.GET_USER_REQUEST:
      return { ...state, isLoading: true }
    case actions.GET_USER_SUCCESS:
      return { ...state, user: action.user, isLoading: false }
    case actions.GET_USER_ERROR:
      return { ...state, isLoading: false }
    case actions.LOGOUT_REQUEST:
      return { ...state, isLoading: true }
    case actions.LOGOUT_SUCCESS:
      return { ...state, user: null, isLoading: false }
    case actions.LOGOUT_ERROR:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
