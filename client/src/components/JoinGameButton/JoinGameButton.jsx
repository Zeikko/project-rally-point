import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { joinGameAction } from '../../actions/game-actions'
import Button from '../Button/Button'

class LogoutButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { dispatch, game } = this.props
    dispatch(joinGameAction(game.data.id))
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
}

export default LogoutButton
