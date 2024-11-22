import Project from "../models/projectSchema.js";
import Todo from "../models/TodoSchema.js";

const addTodo = async (req, res) => {
  const { projectId } = req.body;

  try {
    const isProjectExist = await Project.findById(projectId);

    if (isProjectExist) {
      const newTodo = await Todo.create(req.body);

      isProjectExist.list_of_todos.push(newTodo._id);

      await isProjectExist.save();

      res.status(201).json({
        status: "success",
        success: true,
        message: "Details added succesfully",
        data: newTodo,
      });
    } else {
      res.status(400).json({
        status: "failed",
        success: false,
        message: "project with this id not found",
      });
    }
  } catch (err) {
    console.log("error");
    res.status(400).json({
      status: "failed",
      success: false,
      message: err.message,
    });
  }
};

export { addTodo };
