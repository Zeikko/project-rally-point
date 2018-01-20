import actions from '../../../common/actions.json'

export const getUserAction = () => ({
  type: actions.GET_USER_REQUEST,
})

export const logoutAction = () => ({
  type: actions.LOGOUT_REQUEST,
})

export const simulateUserAction = id => ({
  type: actions.SIMULATE_USER,
  id,
})
