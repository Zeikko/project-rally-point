import db from '../db'

export function migrateLatest() {
  return db.migrate.rollback()
    .then(() => db.migrate.latest())
}

export function migrateRollback() {
  return db.migrate.rollback()
}
