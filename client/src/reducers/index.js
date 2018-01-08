import { combineReducers } from 'redux'
import user from './user-reducer'
import game from './game-reducer'
import players from './players-reducer'

export default combineReducers({
  user,
  game,
  players,
})
