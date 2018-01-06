import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import LoginStatus from '../LoginStatus/LoginStatus'
import * as propTypes from '../../constants/prop-types'
import JoinGameButton from '../JoinGameButton/JoinGameButton'
import LeaveGameButton from '../LeaveGameButton/LeaveGameButton'


function gAME(props) {
  const { dispatch, user, game, players } = props
  if (!game.data) {
    return null
  }
  const isPlayerInGame = _.find(players.data, { userId: _.get(user, 'data.id') })
  if (isPlayerInGame) {
    return <LeaveGameButton game={game} user={user} dispatch={dispatch} />
  } else {
    return <JoinGameButton game={game} user={user} dispatch={dispatch} />
  }

}

gAME.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: propTypes.user.isRequired,
}

export default gAME

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #EEE;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const Heading = styled.div`
  font-size: 20px;
`
