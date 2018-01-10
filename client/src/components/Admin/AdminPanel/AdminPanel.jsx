import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import * as propTypes from '../../../constants/prop-types'
import SimulateQueueFull from '../SimulateQueueFull/SimulateQueueFull'
import SimulateQueueEmpty from '../SimulateQueueEmpty/SimulateQueueEmpty'

function AdminPanel(props) {
  const {
    dispatch, userState, gameState,
  } = props
  if (_.get(userState, 'user.role') !== 'admin') {
    return null
  }
  return (
    <div>
      <SimulateQueueFull gameState={gameState} dispatch={dispatch} />
      <SimulateQueueEmpty gameState={gameState} dispatch={dispatch} />
    </div>
  )
}

AdminPanel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: propTypes.userState.isRequired,
  gameState: propTypes.gameState.isRequired,
}

export default AdminPanel
