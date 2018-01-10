import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { getPlayersAction } from '../../actions/player-actions'
import * as propTypes from '../../constants/prop-types'
import VoteCaptainButton from '../VoteCaptainButton/VoteCaptainButton'
import gameStatuses from '../../../../common/game-statuses'

class PlayersList extends Component {
  componentDidMount() {
    const { dispatch, gameState } = this.props
    dispatch(getPlayersAction(gameState.game.id))
  }

  render() {
    const { playersState, gameState, dispatch } = this.props
    if (!playersState.players.length) {
      return null
    }
    return (
      <div>
        <Heading>Players waiting for a game</Heading>
        {playersState.players.map(player => (
          <div key={player.id}>
            <img alt={player.displayName} src={player.smallAvatarUrl} />
            {player.displayName} ({player.country})
            {gameState.game.status === gameStatuses.VOTE_CAPTAINS && <VoteCaptainButton dispatch={dispatch} player={player} gameState={gameState} />}
          </div>
        ))}
      </div>
    )
  }
}

PlayersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameState: propTypes.gameState.isRequired,
  playersState: propTypes.playersState.isRequired,
}

export default PlayersList

const Heading = styled.div`
  font-size: 20px;
`
