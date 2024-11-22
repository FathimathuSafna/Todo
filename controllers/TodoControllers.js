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

const updateTodo = async (req, res) => {
  const { description, status } = req.body;
  try {
    let id = req.params.id;
    const updateTodo = await Todo.updateOne(
      { _id: id },
      { $set: { status, description } }
    );

    res.status(201).json({
      status: "success",
      success: true,
      message: "Details updated succesfully",
      data: updateTodo,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      success: false,
      message: err.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  const toDoId = req.params.id;
  try {
    const toDo = await Todo.findById(toDoId);
    if (!toDo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    const updatedProjects = await Project.updateMany(
      { list_of_Todos: { $in: [toDo._id] } }, // Find Projects that reference this Todo
      { $pull: { list_of_Todos: toDo._id } } // pull for Remove the Todo ID from the list_of_Todos array
    );
    await Todo.findByIdAndDelete(toDoId);

    res.status(201).json({
      status: "success",
      success: true,
      message: "Todo and its references in Projects deleted successfully",
      data: {
        updatedProjects: updatedProjects.modifiedCount, // Count of projects where the Todo was removed
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      success: false,
      message: err.message,
    });
  }
};

export { addTodo, updateTodo, deleteTodo };
