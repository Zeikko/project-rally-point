import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import * as propTypes from '../../../constants/prop-types'
import SimulateQueueFull from '../SimulateQueueFull/SimulateQueueFull'
import SimulateQueueEmpty from '../SimulateQueueEmpty/SimulateQueueEmpty'
import SimulateCaptainVotes from '../SimulateCaptainVotes/SimulateCaptainVotes'
import CreateGameButton from '../CreateGameButton/CreateGameButton'
import SimulateUserSelect from '../SimulateUserSelect/SimulateUserSelect'

function AdminPanel(props) {
  const {
    dispatch, userState, gameState,
  } = props
  if (_.get(userState, 'user.role') !== 'admin') {
    return null
  }
  return (
    <div>
      <SimulateUserSelect dispatch={dispatch} />
      <SimulateQueueFull gameState={gameState} dispatch={dispatch} />
      <SimulateQueueEmpty gameState={gameState} dispatch={dispatch} />
      <SimulateCaptainVotes gameState={gameState} dispatch={dispatch} />
      <CreateGameButton dispatch={dispatch} />
    </div>
  )
}

AdminPanel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: propTypes.userState.isRequired,
  gameState: propTypes.gameState.isRequired,
}

export default AdminPanel
