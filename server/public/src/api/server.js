import $ from 'jquery'

export const getTodos = async () => {
  return $.ajax({
    method: 'GET',
    url: '/todos'
  })
}

export const addTodo = async (todo) => {
  return $.ajax({
    method: 'POST',
    url: '/todos',
    data: todo
  })
}

export const deleteTodo = async (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/todos/${id}`
  })
}
