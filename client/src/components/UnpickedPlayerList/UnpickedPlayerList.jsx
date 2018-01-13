import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import * as propTypes from '../../constants/prop-types'
import VoteCaptainButton from '../VoteCaptainButton/VoteCaptainButton'
import Player from '../Player/Player'
import PickPlayerButton from '../PickPlayerButton/PickPlayerButton'

function UnpickedPlayersList(props) {
  const {
    players, game, captainVotes, user, dispatch,
  } = props
  if (!players.length) {
    return null
  }
  const unpickedPlayers = players.filter(player => player.team === null)
  return (
    <div>
      <Heading>Players waiting for a game ({unpickedPlayers.length} players)</Heading>
      {unpickedPlayers.map(player => (
        <div key={player.id}>
          <Player player={player} />
          <VoteCaptainButton
            dispatch={dispatch}
            player={player}
            game={game}
            captainVotes={captainVotes}
            user={user}
          />
          <PickPlayerButton
            dispatch={dispatch}
            player={player}
            game={game}
            players={players}
            user={user}
          />
        </div>
      ))}
    </div>
  )
}

UnpickedPlayersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  game: propTypes.game.isRequired,
  players: PropTypes.arrayOf(propTypes.player).isRequired,
  captainVotes: PropTypes.arrayOf(propTypes.captainVote).isRequired,
  user: propTypes.user.isRequired,
}

export default UnpickedPlayersList

const Heading = styled.div`
  font-size: 20px;
`
