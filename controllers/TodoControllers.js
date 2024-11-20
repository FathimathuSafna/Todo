import Todo from "../models/TodoSchema.js";

const addTodo = async (req,res)=>{    
    try{
        const newTodo = await Todo.create(req.body)
        console.log(req.body)
        res.status(201).json({ 
            msg:"Details added succesfully",
            data:newTodo
        })
    }
    catch(err){
        res.status(400).json(err)
    }
}

export {addTodo}