import express from 'express'
import todosRouter from './modules/routes/todos.js'

const app = express()

app.use(express.static('server/public'))
app.use(express.urlencoded({ extended: true }))

app.use('/todos', todosRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
