import db from '../db'

export async function getIsPlayerInGame(userId, gameId) {
  const player = await db('player')
    .select('id')
    .where({
      userId,
      gameId,
    })
  return player.length > 0
}

export async function pickPlayer(gameId, userId, team, squad, role) {
  return db('player')
    .update({
      team,
      role,
      squad,
    })
    .where({
      gameId,
      userId,
    })
    .returning('*')
}

export function getGamePlayers(gameId) {
  return db('player')
    .select([
      'user.id',
      'steamId',
      'displayName',
      'smallAvatarUrl',
      'country',
      'player.role',
      'player.team',
      'player.squad',
    ])
    .leftJoin('user', 'player.userId', 'user.id')
    .where({ gameId })
}
