import { Router } from 'express'
import { getTodos } from '../data/dummy.js'

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

export default router
