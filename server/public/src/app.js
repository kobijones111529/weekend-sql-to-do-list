import $ from 'jquery'
import { addTodo, deleteTodo, getTodos } from './api/server.js'

function setupEventListeners () {
  $('#add-todo-form').on('submit', handleSubmitTodo)
  $('#todo-list').on('click', '#delete-button', handleDeleteTodo)
}

/**
 * Handle todo submit event
 * @param {SubmitEvent} event Submit event
 */
function handleSubmitTodo (event) {
  // Prevent page reload
  event.preventDefault()

  const jqForm = $(event.target)
  const jqTodo = jqForm.find('input[name=todo]')

  const todo = {
    todo: jqTodo.val()
  }

  validateTodo(todo)
    .then(todo => {
      return addTodo(todo)
    })
    .catch(() => {})
    .then(() => {
      return getTodos()
    })
    .then(todos => {
      renderTodos(todos)
    })
}

async function validateTodo (todo) {
  if (todo.todo === '') {
    console.log('Invalid: empty todo')
    // TODO: handle empty todo
    throw new Error('empty')
  }

  const currentTodos = await getTodos()

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
function handleDeleteTodo (event) {
  const jqTarget = $(event.target)
  const row = jqTarget.parents('tr')
  const id = row.data('id')
  deleteTodo(id)
    .then(() => {
      return getTodos()
    })
    .catch(err => {
      // TODO: handle error
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
        <tr data-id="${todo.id}">
          <td>${todo.todo}</td>
          <td>
            <button id="delete-button">Delete</button>
          </td>
        </tr>
      `)
      return jqElem
    },
    jqTodoList
  )
}

function main () {
  getTodos()
    .then(todos => {
      renderTodos(todos)
    })

  setupEventListeners()
}

export default () => {
  $(main)
}
