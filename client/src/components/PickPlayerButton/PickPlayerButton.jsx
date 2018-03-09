import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { pickSquadLeaderAction, pickSquadMemberAction } from '../../actions/player-actions'
import Button from '../Button/Button'
import gameStatuses from '../../../../common/game-statuses.json'
import playerRoles from '../../../../common/player-roles.json'
import * as propTypes from '../../constants/prop-types'

class PickPlayerButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const {
      dispatch, game, player, user,
    } = this.props
    if (game.status === gameStatuses.SQUAD_LEADER_PICK) {
      dispatch(pickSquadLeaderAction(game.id, player.id, game.teamWithTurnToPick, user.id))
    } else {
      dispatch(pickSquadMemberAction(game.id, player.id, game.teamWithTurnToPick, user.id))
    }
  }

  render() {
    const { game, players, user } = this.props
    const userPlayer = _.find(players, { id: user.id })
    if (userPlayer) {
      const userPlayerRole = _.get(userPlayer, 'role')
      const userPlayerTeam = _.get(userPlayer, 'team')
      const isUserPlayersTurn = game.teamWithTurnToPick === userPlayerTeam
      const isCaptain = userPlayerRole === playerRoles.CAPTAIN
      const isSquadLeader = userPlayerRole === playerRoles.SQUAD_LEADER
      const playersInTeam = _.filter(players, { team: userPlayer.team })
      const playerCountInSquad = _.filter(playersInTeam, { squad: userPlayer.squad }).length
      const smallestSquadPlayerCount = _.chain(playersInTeam)
        .groupBy(player => player.squad)
        .toArray()
        .minBy(squad => squad.length)
        .get('length', 0)
        .value()
      const canPickSquadLeader = game.status === gameStatuses.SQUAD_LEADER_PICK
        && isCaptain
        && isUserPlayersTurn
      const canPickSquadMember = game.status === gameStatuses.SQUAD_MEMBER_PICK
        && (isCaptain || isSquadLeader)
        && isUserPlayersTurn
        && playerCountInSquad <= smallestSquadPlayerCount
      if (canPickSquadLeader || canPickSquadMember) {
        return (
          <Button onClick={() => { this.handleClick() }}>
            Pick Player
          </Button>
        )
      }
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
