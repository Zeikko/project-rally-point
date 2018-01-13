import PropTypes from 'prop-types'

export const user = PropTypes.shape({
  country: PropTypes.string,
  displayName: PropTypes.string.isRequired,
  fullAvatarUrl: PropTypes.string,
  id: PropTypes.number.isRequired,
  mediumAvatarUrl: PropTypes.string,
  primaryClanId: PropTypes.string,
  profileUrl: PropTypes.string.isRequired,
  smallAvatarUrl: PropTypes.string,
  steamId: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
})

export const player = PropTypes.shape({

})

export const game = PropTypes.shape({
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
})

export const captainVote = PropTypes.shape({
  id: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  voterId: PropTypes.number.isRequired,
  votedId: PropTypes.number.isRequired,
})

export const userState = PropTypes.shape({
  isLoading: PropTypes.bool.isRequired,
  user,
})

export const gameState = PropTypes.shape({
  game,
})

export const playersState = PropTypes.shape({
  players: PropTypes.arrayOf(player),
})

export const captainVotesState = PropTypes.shape({
  captainVotes: PropTypes.arrayOf(captainVote),
})
