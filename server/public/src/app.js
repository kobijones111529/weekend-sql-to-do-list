import $ from 'jquery'
import * as dummyAPI from './api/dummy.js'
import * as serverAPI from './api/server.js'

const setupEventListeners = api => {
  $('#add-todo-form').on('submit', handleSubmitTodo(api))
  $('#todo-list').on('click', '.delete-button', handleDeleteTodo(api))
  $('#todo-list').on('click', '.mark-complete', handleMarkComplete(api))
}

/**
 * Handle todo submit event
 * @param {SubmitEvent} event Submit event
 */
const handleSubmitTodo = api => function (event) {
  // Prevent page reload
  event.preventDefault()

  const jqForm = $(event.target)
  const jqTodo = jqForm.find('input[name=todo]')

  const todo = {
    todo: jqTodo.val(),
    complete: false
  }

  validateTodo(api)(todo)
    .then(todo => api.addTodo(todo))
    .catch(() => {})
    .then(() => api.getTodos())
    .then(todos => {
      renderTodos(todos)
    })
}

const validateTodo = api => async function (todo) {
  if (todo.todo === '') {
    console.log('Invalid: empty todo')
    // TODO: handle empty todo
    throw new Error('empty')
  }

  const currentTodos = await api.getTodos()

  const duplicate = currentTodos.find(existingTodo => existingTodo.todo === todo.todo)
  if (duplicate !== undefined) {
    console.log('Invalid: duplicate todo')
    // TODO: handle duplicate todo
    throw new Error('duplicate')
  }

  return todo
}

/**
 * Handle todo delete button click
 * @param {MouseEvent} event Click event
 */
const handleDeleteTodo = api => function (event) {
  const jqTarget = $(event.target)
  const row = jqTarget.parents('tr')
  const id = row.data('id')
  api.deleteTodo(id)
    .then(() => api.getTodos())
    .catch(err => {
      // TODO: handle error
      throw err
    })
    .then(todos => {
      renderTodos(todos)
    })
}

/**
 * handle todo mark complete click event
 * @param {MouseEvent} event Click event
 */
const handleMarkComplete = api => function (event) {
  const jqTarget = $(event.target)

  if (jqTarget.is(':disabled') || !jqTarget.is(':checked')) {
    return
  }

  const row = jqTarget.parents('tr')
  const id = row.data('id')
  api.markComplete(id)
    .then(() => api.getTodos())
    .catch(err => {
      throw err
    })
    .then(todos => {
      renderTodos(todos)
    })
}

function renderTodos (todos) {
  const jqTodoList = $('#todo-list')
  jqTodoList.empty()
  todos.reduce(
    (jqElem, todo) => {
      jqElem.append(`
        <tr ${todo.complete ? 'class="complete"' : ''} data-id="${todo.id}">
          <td>
            <input type="checkbox" class="mark-complete" ${todo.complete ? 'checked disabled' : ''}>
          </td>
          <td>
            ${todo.complete ? `<strike>${todo.todo}</strike>` : todo.todo}
          <td>
            <button class="delete-button">Delete</button>
          </td>
        </tr>
      `)
      return jqElem
    },
    jqTodoList
  )
}

function main (api) {
  // Initial render
  api.getTodos()
    .then(todos => {
      renderTodos(todos)
    })

  setupEventListeners(api)
}

export default () => {
  const useServerAPI = true

  $(() => main(useServerAPI ? serverAPI : dummyAPI))
}
