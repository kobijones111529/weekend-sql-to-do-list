import pool from '../pool.js'

export const getTodos = async () => {
  const query = `
    SELECT * FROM "todos";
  `
  const result = await pool.query(query)
  return result.rows
}

export const addTodo = async (todo) => {
  const query = `
    INSERT INTO "todos"
      ("todo")
    VALUES
      ($1);
  `
  const queryData = [todo.todo]
  return pool.query(query, queryData)
}
