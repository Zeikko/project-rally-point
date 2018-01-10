import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { voteCaptainAction } from '../../../actions/captain-vote-actions'
import Button from '../../Button/Button'
import * as propTypes from '../../../constants/prop-types'

class SimulateCaptainVotes extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    const { dispatch, gameState } = this.props
    for (let id = 1; id <= 48; id += 1) {
      dispatch(voteCaptainAction(gameState.game.id, _.random(1, 48), id))
      await sleep(_.random(10, 100)) // eslint-disable-line no-await-in-loop
    }
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        Simulate Captain Votes
      </Button>
    )
  }
}

SimulateCaptainVotes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameState: propTypes.gameState.isRequired,
}

export default SimulateCaptainVotes

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
