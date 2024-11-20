import express from 'express'
import { addDetails,updateProject,deleteProject,getProjectDetails,listProjects } from '../controllers/projectControllers.js'

const app = express.Router()

app.route('/').post(addDetails).get(listProjects)
app.route('/:id').put(updateProject).delete(deleteProject).get(getProjectDetails)

export default app