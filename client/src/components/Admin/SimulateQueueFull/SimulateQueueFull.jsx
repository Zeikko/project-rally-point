import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { joinGameAction } from '../../../actions/player-actions'
import Button from '../../Button/Button'
import * as propTypes from '../../../constants/prop-types'

class SimulateQueueFull extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    const { dispatch, game } = this.props
    for (let id = 1; id <= 48; id += 1) {
      dispatch(joinGameAction(game.data.id, id))
      await sleep(_.random(10, 100)) // eslint-disable-line no-await-in-loop
    }
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        Simulate Queue Full
      </Button>
    )
  }
}

SimulateQueueFull.propTypes = {
  dispatch: PropTypes.func.isRequired,
  game: propTypes.game.isRequired,
}

export default SimulateQueueFull

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
