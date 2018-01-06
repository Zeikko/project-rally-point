import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import rootSaga from './sagas'

const socket = io();
const socketIoMiddleware = createSocketIoMiddleware(socket, (type, action) => action.socket)

function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware), applyMiddleware(socketIoMiddleware))),
    runSaga: sagaMiddleware.run(rootSaga),
  }
}

const store = configureStore()
store.dispatch({type:'socket/hello', data:'Hello!'});
export default store
