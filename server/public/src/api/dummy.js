const todos = [
  {
    todo: 'Walk dog',
    complete: false
  },
  {
    todo: 'Eat the rich',
    complete: false
  }
]

const id = (function * () {
  for (let i = 1; ; i++) {
    yield i
  }
}())

const table = todos.map(todo => {
  const entries = Object.entries(todo)
  entries.unshift(['id', id.next().value])
  return Object.fromEntries(entries)
})

export const getTodos = async () => table

export const addTodo = async todo => {
  table.push({
    id: id.next().value,
    todo: todo.todo,
    complete: todo.complete || false
  })
}

export const deleteTodo = async id => {
  const index = table.findIndex(todo => todo.id === id)

  if (index === -1) {
    return
  }

  table.splice(index, 1)
}

export const markComplete = async id => {
  const index = table.findIndex(todo => todo.id === id)

  if (index === -1) {
    return
  }

  table[index].complete = true
}
