const todos = [
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

const table = todos.map(todo => {
  const entries = Object.entries(todo)
  entries.unshift(['id', id.next().value])
  return Object.fromEntries(entries)
})

export const getTodos = async () => {
  return table
}
