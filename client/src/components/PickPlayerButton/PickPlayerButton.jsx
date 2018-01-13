import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { pickPlayerAction } from '../../actions/player-actions'
import Button from '../Button/Button'
import gameStatuses from '../../../../common/game-statuses.json'
import playerRoles from '../../../../common/player-roles.json'
import * as propTypes from '../../constants/prop-types'

class PickPlayerButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(squad, role) {
    const { dispatch, game, player } = this.props
    dispatch(pickPlayerAction(game.id, player.id, game.teamWithTurnToPick, squad, role))
  }

  render() {
    const { game, players, user } = this.props
    const userPlayer = _.find(players, { id: user.id })
    const canPickSquadLeader = game.status === gameStatuses.SQUAD_LEADER_PICK
      && _.get(userPlayer, 'role') === playerRoles.CAPTAIN
      && game.teamWithTurnToPick === userPlayer.team
    if (canPickSquadLeader) {
      const numberOfSquadLeadersInTeam = _.filter(players, {
        team: userPlayer.team,
        role: playerRoles.SQUAD_LEADER,
      }).length
      const squad = numberOfSquadLeadersInTeam + 2
      return (
        <Button onClick={() => { this.handleClick(squad, playerRoles.SQUAD_LEADER) }}>
          Pick
        </Button>
      )
    }
    return null
  }
}

PickPlayerButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: propTypes.player.isRequired,
  game: propTypes.game.isRequired,
  players: PropTypes.arrayOf(propTypes.player).isRequired,
  user: propTypes.user.isRequired,
}

export default PickPlayerButton
