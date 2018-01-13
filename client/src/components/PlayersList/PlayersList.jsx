import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import * as propTypes from '../../constants/prop-types'
import VoteCaptainButton from '../VoteCaptainButton/VoteCaptainButton'

function PlayersList(props) {
  const {
    playersState, gameState, captainVotesState, userState, dispatch,
  } = props
  if (!playersState.players.length) {
    return null
  }
  return (
    <div>
      <Heading>Players waiting for a game</Heading>
      {playersState.players.map(player => (
        <div key={player.id}>
          <img alt={player.displayName} src={player.smallAvatarUrl} />
          {player.displayName} ({player.country})
          <VoteCaptainButton
            dispatch={dispatch}
            player={player}
            gameState={gameState}
            captainVotesState={captainVotesState}
            userState={userState}
          />
        </div>
      ))}
    </div>
  )
}

PlayersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameState: propTypes.gameState.isRequired,
  playersState: propTypes.playersState.isRequired,
  captainVotesState: propTypes.captainVotesState.isRequired,
  userState: propTypes.userState.isRequired,
}

export default PlayersList

const Heading = styled.div`
  font-size: 20px;
`
