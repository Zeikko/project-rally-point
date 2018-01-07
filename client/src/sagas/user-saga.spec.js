import SagaTester from 'redux-saga-tester'
import fetchMock from 'fetch-mock'
import { getUserAction, logoutAction } from '../actions/user-actions'
import actions from '../../../common/actions.json'
import initialState from '../initial-state'
import userReducer from '../reducers/user-reducer'
import { watchGetUser, watchLogout } from '../sagas/user-saga'

const userFixture = {
  id: 1,
  displayName: 'Test user',
  smallAvatarUrl: 'http://avatar.test/small',
  profileUrl: 'http://profile.test/user',
  steamId: '123',
}

describe('UserSaga', () => {
  let sagaTester
  afterEach(() => {
    fetchMock.restore()
  })

  describe('initial state', () => {
    beforeEach(() => {
      sagaTester = new SagaTester({
        initialState: { user: initialState.user },
        reducers: { user: userReducer },
      })
    })

    it('gets user', async () => {
      sagaTester.start(watchGetUser)
      fetchMock.get('/api/auth/loggedin', userFixture)
      sagaTester.dispatch(getUserAction())
      await sagaTester.waitFor(actions.GET_USER_REQUEST)
      await sagaTester.waitFor(actions.GET_USER_SUCCESS)
      expect(sagaTester.getState().user).toEqual({
        isLoading: false,
        data: userFixture,
      })
    })

    it('handles error when getting user', async () => {
      sagaTester.start(watchGetUser)
      fetchMock.get('/api/auth/loggedin', 500)
      sagaTester.dispatch(getUserAction())
      await sagaTester.waitFor(actions.GET_USER_ERROR)
      expect(sagaTester.getState().user).toEqual({
        isLoading: false,
        data: null,
      })
    })
  })

  describe('user is logged in', () => {
    beforeEach(() => {
      sagaTester = new SagaTester({
        initialState: {
          user: {
            data: userFixture,
          },
        },
        reducers: { user: userReducer },
      })
    })

    it('logs out user', async () => {
      sagaTester.start(watchLogout)
      fetchMock.post('/api/auth/logout', { message: 'Logged out' })
      sagaTester.dispatch(logoutAction())
      await sagaTester.waitFor(actions.LOGOUT_REQUEST)
      await sagaTester.waitFor(actions.LOGOUT_SUCCESS)
      expect(sagaTester.getState().user).toEqual({
        isLoading: false,
        data: null,
      })
    })

    it('handles error when logging out', async () => {
      sagaTester.start(watchLogout)
      fetchMock.post('/api/auth/logout', 500)
      sagaTester.dispatch(logoutAction())
      await sagaTester.waitFor(actions.LOGOUT_ERROR)
      expect(sagaTester.getState().user).toEqual({
        isLoading: false,
        data: userFixture,
      })
    })
  })
})
