import db from '../db'
import actions from '../../../common/actions'

export default function game(io, socket, action) {
  switch(action.type) {
    case actions.GET_PLAYERS_REQUEST:
      return getPlayersRequest(io, socket, action)
  }
}

export function getPlayersRequest(io, socket, action) {
  console.log(action)
  return getGamePlayers(action.gameId)
    .then((players) => {
      socket.emit('action', {
        type: actions.GET_PLAYERS_SUCCESS,
        data: players
      })
    })
}

export function getGamePlayers(gameId) {
  return db('player')
    .select('*')
    .leftJoin('user', 'player.userId', 'user.id')
    .where({
      gameId: gameId
    })
}
