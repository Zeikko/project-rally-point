import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import TopBar from '../TopBar/TopBar'
import * as propTypes from '../../constants/prop-types'
import PlayersList from '../PlayersList/PlayersList'
import Game from '../Game/Game'
import AdminPanel from '../Admin/AdminPanel/AdminPanel'

function App(props) {
  const {
    dispatch,
    userState,
    gameState,
    playersState,
    captainVotesState,
  } = props
  return (
    <div>
      <TopBar userState={userState} dispatch={dispatch} />
      <AdminPanel gameState={gameState} userState={userState} dispatch={dispatch} />
      <Game
        playersState={playersState}
        gameState={gameState}
        userState={userState}
        dispatch={dispatch}
      />
      {gameState.game && <PlayersList
        playersState={playersState}
        gameState={gameState}
        captainVotesState={captainVotesState}
        userState={userState}
        dispatch={dispatch}
      />}
    </div>
  )
}

/* istanbul ignore next */
const mapStateToProps = ({
  userState,
  gameState,
  playersState,
  captainVotesState,
}) => ({
  userState,
  gameState,
  playersState,
  captainVotesState,
})

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: propTypes.userState.isRequired,
  gameState: propTypes.gameState.isRequired,
  playersState: propTypes.playersState.isRequired,
  captainVotesState: propTypes.captainVotesState.isRequired,
}

export { App as AppWithoutConnect }
export default connect(mapStateToProps)(App)
