import express from 'express'
import { addTodo,updateTodo,deleteTodo } from '../controllers/TodoControllers.js'

const app = express.Router()

app.route('/').post(addTodo)
app.route('/:id').put(updateTodo).delete(deleteTodo)

export default app