import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import TopBar from '../TopBar/TopBar'
import * as propTypes from '../../constants/prop-types'
import PlayersList from '../PlayersList/PlayersList'
import Game from '../Game/Game'

function App(props) {
  const {
    dispatch,
    user,
    game,
    players,
  } = props
  return (
    <div>
      <TopBar user={user} dispatch={dispatch} />
      <Game players={players} game={game} user={user} dispatch={dispatch} />
      {game.data && <PlayersList players={players} game={game} dispatch={dispatch} />}
    </div>
  )
}

/* istanbul ignore next */
const mapStateToProps = ({
  user,
  game,
  players,
}) => ({
  user,
  game,
  players,
})

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: propTypes.user.isRequired,
  game: propTypes.game.isRequired,
  players: propTypes.players.isRequired,
}

export { App as AppWithoutConnect }
export default connect(mapStateToProps)(App)
