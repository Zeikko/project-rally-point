import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { voteCaptainAction } from '../../actions/captain-vote-actions'
import Button from '../Button/Button'
import * as propTypes from '../../constants/prop-types'
import gameStatuses from '../../../../common/game-statuses.json'

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
    const {
      player, gameState, captainVotesState, userState,
    } = this.props
    if (gameState.game.status !== gameStatuses.VOTE_CAPTAINS) {
      return null
    }
    const userHasVoted = _.find(captainVotesState.captainVotes, { voterId: userState.user.id })
    if (userHasVoted) {
      const votes = _.filter(captainVotesState.captainVotes, { votedId: player.userId }).length
      return <span>{ votes }</span>
    }
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
  gameState: propTypes.gameState.isRequired,
  captainVotesState: propTypes.captainVotesState.isRequired,
  userState: propTypes.userState.isRequired,
}

export default VoteCaptainButton
