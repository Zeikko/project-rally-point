import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TopBar from '../TopBar/TopBar'
import * as propTypes from '../../constants/prop-types'
import UnpickedPlayerList from '../UnpickedPlayerList/UnpickedPlayerList'
import Game from '../Game/Game'
import AdminPanel from '../Admin/AdminPanel/AdminPanel'
import Team from '../Team/Team'

function App(props) {
  const {
    dispatch,
    userState,
    userState: { user },
    gameState,
    gameState: { game },
    playersState,
    playersState: { players },
    captainVotesState: { captainVotes },
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
      {gameState.game &&
        <PlayerLists>
          <Team
            players={players}
            team={1}
          />
          <UnpickedPlayerList
            players={players}
            game={game}
            captainVotes={captainVotes}
            user={user}
            dispatch={dispatch}
          />
          <Team
            players={players}
            team={2}
          />
        </PlayerLists>
      }
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

const PlayerLists = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-around;
`
