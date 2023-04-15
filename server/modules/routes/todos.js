import { Router } from 'express'
import { addTodo, getTodos } from '../data/database.js'

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

export default router
