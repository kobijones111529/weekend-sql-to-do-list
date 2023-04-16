import pg from 'pg'

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'todo_app'
})

export default pool
