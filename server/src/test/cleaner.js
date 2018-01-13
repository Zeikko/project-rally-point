import { migrateLatest, migrateRollback } from './db'
import db from '../db'

beforeEach(() => migrateLatest())
afterEach(() => migrateRollback())

afterAll(() => db.destroy())
