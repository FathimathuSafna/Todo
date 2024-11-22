import express from 'express'
import { addTodo,getTodo,updateTodo,deleteTodo } from '../controllers/TodoControllers.js'

const app = express.Router()

app.route('/').post(addTodo)
app.route('/:id').put(updateTodo).delete(deleteTodo).get(getTodo)

export default app