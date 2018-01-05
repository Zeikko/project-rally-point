import { fork } from 'redux-saga/effects'
import { watchGetUser, watchLogout } from './user-saga'

export default function* startForeman() {
  yield [
    fork(watchGetUser),
    fork(watchLogout),
  ]
}
