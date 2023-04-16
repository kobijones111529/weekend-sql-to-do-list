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

export const deleteTodo = async (id) => {
  const query = `
    DELETE FROM "todos"
      WHERE "id" = $1;
  `
  const queryData = [id]
  return pool.query(query, queryData)
}
