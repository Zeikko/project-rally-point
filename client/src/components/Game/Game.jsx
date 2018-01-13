import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import * as propTypes from '../../constants/prop-types'
import JoinGameButton from '../JoinGameButton/JoinGameButton'
import LeaveGameButton from '../LeaveGameButton/LeaveGameButton'

function Game(props) {
  const {
    dispatch, userState, gameState, playersState,
  } = props
  if (!gameState.game) {
    return null
  }
  const isPlayerInGame = _.find(playersState.players, { id: _.get(userState, 'user.id') })
  return (
    <div>
      <div>{gameState.game.status}</div>
      <div>Players: {playersState.players.length} / {gameState.game.maxPlayers}</div>
      {isPlayerInGame ?
        <LeaveGameButton gameState={gameState} userState={userState} dispatch={dispatch} /> :
        <JoinGameButton gameState={gameState} userState={userState} dispatch={dispatch} />
      }
    </div>
  )
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: propTypes.userState.isRequired,
  gameState: propTypes.gameState.isRequired,
  playersState: propTypes.playersState.isRequired,
}

export default Game
