import initialState from '../initial-state'
import * as actions from '../constants/actions'

export default function (state = initialState.user, action) {
  switch (action.type) {
    case actions.GET_USER_REQUEST:
      return { ...state, isLoading: true }
    case actions.GET_USER_SUCCESS:
      return { ...state, data: action.user, isLoading: false }
    case actions.GET_USER_ERROR:
      return { ...state, isLoading: false }
    case actions.LOGOUT_REQUEST:
      return { ...state, isLoading: true }
    case actions.LOGOUT_SUCCESS:
      return { ...state, data: null, isLoading: false }
    case actions.LOGOUT_ERROR:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
