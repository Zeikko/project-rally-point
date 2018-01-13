import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import * as propTypes from '../../constants/prop-types'

function Player(props) {
  const {
    player,
  } = props
  return (
    <div>
      <img alt={player.displayName} src={player.smallAvatarUrl} />
      {player.displayName} ({player.country}) {player.role && `[${player.role}]`}
    </div>
  )
}

Player.propTypes = {
  player: propTypes.player.isRequired,
}

export default Player
