import * as actions from '../constants/actions'

export const getUserAction = () => ({
  type: actions.GET_USER_REQUEST,
})

export const logoutAction = () => ({
  type: actions.LOGOUT_REQUEST,
})
