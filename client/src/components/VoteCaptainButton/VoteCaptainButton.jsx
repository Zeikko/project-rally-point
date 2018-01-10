import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { voteCaptainAction } from '../../actions/player-actions'
import Button from '../Button/Button'
import * as propTypes from '../../constants/prop-types'

class VoteCaptainButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { dispatch, player, gameState } = this.props
    dispatch(voteCaptainAction(gameState.game.id, player.id))
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        Vote
      </Button>
    )
  }
}

VoteCaptainButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: propTypes.user.isRequired,
  gameState: propTypes.gameState.isRequired
}

export default VoteCaptainButton
