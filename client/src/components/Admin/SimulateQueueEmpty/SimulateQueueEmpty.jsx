import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { leaveGameAction } from '../../../actions/player-actions'
import Button from '../../Button/Button'
import * as propTypes from '../../../constants/prop-types'

class SimulateQueueEmpty extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    const { dispatch, game } = this.props
    for(let id = 1; id <= 48; id++) {
      dispatch(leaveGameAction(game.data.id, id))
      await sleep(_.random(10, 100))
    }
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        Simulate Queue Empty
      </Button>
    )
  }
}

SimulateQueueEmpty.propTypes = {
  dispatch: PropTypes.func.isRequired,
  game: propTypes.game.isRequired,
}

export default SimulateQueueEmpty

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
