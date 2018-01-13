import actions from '../../../common/actions.json'
import initialState from '../initial-state'

export default function reducer(state = initialState.captainVotesState, action) {
  switch (action.type) {
    case actions.GET_CAPTAIN_VOTES_SUCCESS:
      return { ...state, captainVotes: action.captainVotes }
    default:
      return state
  }
}
