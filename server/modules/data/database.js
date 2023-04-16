import pool from '../pool.js'

/**
 * Get todos from database
 */
export const getTodos = async () => {
  const query = `
    SELECT * FROM "todos"
      ORDER BY "id";
  `
  const result = await pool.query(query)
  return result.rows
}

/**
 * Add todo to database
 * @param todo New todo
 */
export const addTodo = async todo => {
  const query = `
    INSERT INTO "todos"
      ("todo")
    VALUES
      ($1);
  `
  const queryData = [todo.todo]
  return pool.query(query, queryData)
}

/**
 * Delete todo from database
 * @param {number} id ID of todo to delete
 */
export const deleteTodo = async id => {
  const query = `
    DELETE FROM "todos"
      WHERE "id" = $1;
  `
  const queryData = [id]
  return pool.query(query, queryData)
}

/**
 * Mark todo complete in database
 * @param {number} id ID of complete todo
 */
export const markComplete = async id => {
  const query = `
    UPDATE "todos"
      SET "complete" = TRUE
      WHERE "id" = $1;
  `
  const queryData = [id]
  return pool.query(query, queryData)
}
