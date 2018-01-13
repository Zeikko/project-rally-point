import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import * as propTypes from '../../../constants/prop-types'
import SimulateQueueFull from '../SimulateQueueFull/SimulateQueueFull'
import SimulateQueueEmpty from '../SimulateQueueEmpty/SimulateQueueEmpty'

function AdminPanel(props) {
  const {
    dispatch, user, game,
  } = props
  if (_.get(user, 'data.role') !== 'admin') {
    return null
  }
  return (
    <div>
      <SimulateQueueFull game={game} dispatch={dispatch} />
      <SimulateQueueEmpty game={game} dispatch={dispatch} />
    </div>
  )
}

AdminPanel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: propTypes.user.isRequired,
  game: propTypes.game.isRequired,
}

export default AdminPanel
