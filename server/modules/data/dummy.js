const existingTodos = [
  {
    todo: 'Walk dog'
  },
  {
    todo: 'Walk cat'
  }
]

const id = (function * () {
  for (let i = 1; ; i++) {
    yield i
  }
})()

const addId = todo => {
  const entries = Object.entries(todo)
  entries.unshift(['id', id.next().value])
  return Object.fromEntries(entries)
}

const table = existingTodos.map(todo => addId(todo))

export const getTodos = async () => {
  return table
}

export const addTodo = async (todo) => {
  table.push(addId(todo))
}
