const todos = [
  'Walk dog',
  'Eat the rich'
]

const id = (function * () {
  for (let i = 1; ; i++) {
    yield i
  }
}())

const table = todos.map(todo => {
  return { id: id.next().value, todo }
})

export const getTodos = async () => table

export const addTodo = async (todo) => {
  table.push({
    id: id.next().value,
    todo
  })
}

export const deleteTodo = async (id) => {
  const index = table.findIndex(todo => todo.id === id)
  table.splice(index, 1)
}
