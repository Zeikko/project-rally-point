import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { joinGameAction } from '../../actions/player-actions'
import Button from '../Button/Button'
import * as propTypes from '../../constants/prop-types'

class LogoutButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { dispatch, gameState } = this.props
    dispatch(joinGameAction(gameState.game.id))
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        Join Game
      </Button>
    )
  }
}

LogoutButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameState: propTypes.gameState.isRequired,
}

export default LogoutButton
