import PropTypes from 'prop-types'

const userData = PropTypes.shape({
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

export const user = PropTypes.shape({
  isLoading: PropTypes.bool.isRequired,
  data: userData,
})

export const game = PropTypes.shape({
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }),
})

export const players = PropTypes.shape({
  data: PropTypes.arrayOf(userData),
})
