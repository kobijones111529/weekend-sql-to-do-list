import { Router } from 'express'
import { addTodo, deleteTodo, getTodos } from '../data/database.js'

const router = Router()

router.get('/', (_, res) => {
  getTodos()
    .then(todos => {
      res.send(todos)
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
  addTodo(req.body)
    .then(() => {
      res.sendStatus(201)
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    console.error('id is not an integer')
    res.sendStatus(500)
    return
  }

  deleteTodo(id)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

export default router
