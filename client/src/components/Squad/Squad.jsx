import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import * as propTypes from '../../constants/prop-types'
import Player from '../Player/Player'

function Squad(props) {
  const {
    players, squad,
  } = props
  const playersOfSquad = players.filter(player => player.squad === squad)
  return (
    <div>
      <Heading>Squad {squad} ({playersOfSquad.length} players)</Heading>
      {playersOfSquad.map(player => (
        <div key={player.id}>
          <Player player={player} />
        </div>
      ))}
    </div>
  )
}

Squad.propTypes = {
  players: PropTypes.arrayOf(propTypes.player).isRequired,
  squad: PropTypes.number.isRequired,
}

export default Squad

const Heading = styled.div`
  font-size: 20px;
`
