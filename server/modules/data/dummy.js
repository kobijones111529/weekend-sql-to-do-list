const existingTodos = [
  {
    todo: 'Walk dog',
    complete: false
  },
  {
    todo: 'Walk cat',
    complete: false
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

export const deleteTodo = async (id) => {
  const index = table.findIndex(todo => todo.id === id)

  if (index === -1) {
    return
  }

  table.splice(index, 1)
}

export const markComplete = async (id) => {
  const index = table.findIndex(todo => todo.id === id)

  if (index === -1) {
    return
  }

  table[index].complete = true
}
