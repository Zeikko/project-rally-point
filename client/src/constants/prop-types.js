import PropTypes from 'prop-types'

export const user = PropTypes.shape({
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    country: PropTypes.string,
    created_at: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    fullAvatarUrl: PropTypes.string,
    id: PropTypes.number.isRequired,
    mediumAvatarUrl: PropTypes.string,
    primaryClanId: PropTypes.string,
    profileUrl: PropTypes.string.isRequired,
    smallAvatarUrl: PropTypes.string,
    steamId: PropTypes.string.isRequired,
  }),
})
