import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { getPlayersAction } from '../../actions/player-actions'
import * as propTypes from '../../constants/prop-types'

class PlayersList extends Component {
  componentDidMount() {
    const { dispatch, game } = this.props
    dispatch(getPlayersAction(game.data.id))
  }

  render() {
    const { players } = this.props
    if (!players.data.length) {
      return null
    }
    return (
      <div>
        <Heading>Players waiting for a game</Heading>
        {players.data.map(player => (
          <div key={player.id}>
            <img alt={player.displayName} src={player.smallAvatarUrl} />
            {player.displayName} ({player.country})
          </div>
        ))}
      </div>
    )
  }
}

PlayersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  game: propTypes.game.isRequired,
  players: propTypes.players.isRequired,
}

export default PlayersList

const Heading = styled.div`
  font-size: 20px;
`
