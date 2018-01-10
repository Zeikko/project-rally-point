import { combineReducers } from 'redux'
import user from './user-reducer'
import game from './game-reducer'
import players from './players-reducer'
import captainVotes from './captain-votes-reducer'

export default combineReducers({
  userState: user,
  gameState: game,
  playersState: players,
  captainVotesState: captainVotes,
})
