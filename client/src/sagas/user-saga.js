import { call, put, takeLatest } from 'redux-saga/effects'
import { getUser, logout } from '../api/user'
import * as actions from '../constants/actions'

export function* watchGetUser() {
  yield takeLatest(actions.GET_USER_REQUEST, getUserSaga)
}

function* getUserSaga() {
  try {
    const user = yield call(getUser)
    yield put({ type: actions.GET_USER_SUCCESS, user })
  } catch (error) {
    yield put({ type: actions.GET_USER_ERROR, error })
  }
}

export function* watchLogout() {
  yield takeLatest(actions.LOGOUT_REQUEST, logoutSaga)
}

function* logoutSaga() {
  try {
    yield call(logout)
    yield put({ type: actions.LOGOUT_SUCCESS })
  } catch (error) {
    yield put({ type: actions.LOGOUT_ERROR, error })
  }
}

