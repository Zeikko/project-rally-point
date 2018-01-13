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
    const { dispatch, player, game } = this.props
    dispatch(voteCaptainAction(game.game.id, player.id))
  }

  render() {
    const {
      player, game, captainVotes, user,
    } = this.props
    if (game.status !== gameStatuses.VOTE_CAPTAINS) {
      return null
    }
    const userHasVoted = _.find(captainVotes.captainVotes, { voterId: user.id })
    if (userHasVoted) {
      const votes = _.filter(captainVotes.captainVotes, { votedId: player.id }).length
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
  player: propTypes.player.isRequired,
  game: propTypes.game.isRequired,
  captainVotes: PropTypes.arrayOf(propTypes.captainVote).isRequired,
  user: propTypes.user.isRequired,
}

export default VoteCaptainButton
