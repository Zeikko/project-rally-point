import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import * as propTypes from '../../constants/prop-types'
import JoinGameButton from '../JoinGameButton/JoinGameButton'
import LeaveGameButton from '../LeaveGameButton/LeaveGameButton'

function Game(props) {
  const {
    dispatch, user, game, players,
  } = props
  if (!game.data) {
    return null
  }
  const isPlayerInGame = _.find(players.data, { id: _.get(user, 'data.id') })
  return (
    <div>
      <div>{game.data.status}</div>
      {isPlayerInGame ? 
        <LeaveGameButton game={game} user={user} dispatch={dispatch} /> :
        <JoinGameButton game={game} user={user} dispatch={dispatch} />
      }
    </div>
  )
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: propTypes.user.isRequired,
  game: propTypes.game.isRequired,
  players: propTypes.players.isRequired,
}

export default Game
