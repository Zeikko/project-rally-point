import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import * as propTypes from '../../constants/prop-types'
import Squad from '../Squad/Squad'

function Team(props) {
  const {
    players, team,
  } = props
  const playersOfTeam = players.filter(player => player.team === team)
  return (
    <div>
      <Heading>Team {team} ({playersOfTeam.length} players)</Heading>
      <Squad players={playersOfTeam} squad={1} />
      <Squad players={playersOfTeam} squad={2} />
      <Squad players={playersOfTeam} squad={3} />
    </div>
  )
}

Team.propTypes = {
  players: PropTypes.arrayOf(propTypes.player).isRequired,
  team: PropTypes.number.isRequired,
}

export default Team

const Heading = styled.div`
  font-size: 20px;
`
