import express from 'express'
import { addTodo } from '../controllers/TodoControllers.js'

const app = express.Router()

app.route('/').post(addTodo)

export default app