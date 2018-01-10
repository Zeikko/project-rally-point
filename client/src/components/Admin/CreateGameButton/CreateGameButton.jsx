import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { createGameAction } from '../../../actions/game-actions'
import Button from '../../Button/Button'

class CreateGameButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    const { dispatch } = this.props
    dispatch(createGameAction())
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        Create New Game
      </Button>
    )
  }
}

CreateGameButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default CreateGameButton
