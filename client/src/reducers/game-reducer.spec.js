import gameReducer from './game-reducer'
import actions from '../../../common/actions.json'
import game from '../../../fixtures/game.json'
import initialState from '../initial-state'

describe('gameReducer', () => {
  it('returns old state', () => {
    const nextState = gameReducer(undefined, {
      type: 'irrelevant action',
    })
    expect(nextState).toEqual(initialState.game)
  })

  it('updates game', () => {
    const nextState = gameReducer(undefined, {
      type: actions.GET_GAME_SUCCESS,
      data: game,
    })
    expect(nextState).toEqual({ gameState: game })
  })
})
