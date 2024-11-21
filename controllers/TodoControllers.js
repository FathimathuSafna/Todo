import Project from "../models/projectSchema.js";
import Todo from "../models/TodoSchema.js";

const addTodo = async (req,res)=>{  
    const { projectId } = req.body
    try{
        const isProjectExist = await Project.findById(projectId)
        console.log(isProjectExist)
        if(isProjectExist){
        const newTodo = await Todo.create(req.body)
        isProjectExist.list_of_Todos.push(newTodo._id) // append the todo to the listOfTodo to the project db
        await isProjectExist.save()
        res.status(201).json({ 
            msg:"Details added succesfully",
            data:newTodo
        })
    } else {
        res.status(400).json({
            msg :"invalid id"
        })
    }
    }
    catch(err){
        res.status(400).json(err)
    }
}

export {addTodo}