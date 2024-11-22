import express from 'express'
import { addProject,updateProject,deleteProject,getProjectDetails,getAllProjects } from '../controllers/projectControllers.js'

const app = express.Router()

app.route('/').post(addProject).get(getAllProjects)
app.route('/:id').put(updateProject).delete(deleteProject).get(getProjectDetails)

export default app