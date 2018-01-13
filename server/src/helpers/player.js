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
