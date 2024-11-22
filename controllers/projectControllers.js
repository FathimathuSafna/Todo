import Project from "../models/projectSchema.js";
import Todo from "../models/TodoSchema.js";

const addDetails = async (req, res) => {
  const { title } = req.body;
  try {
    let existProject = await Project.findOne({ title });
    if (!existProject) {
      const newProject = await Project.create(req.body);
      res.status(201).json({
        msg: "Details added succesfully",
        data: newProject,
      });
    } else {
      res.status(400).json({
        msg: "already exist",
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const getProjectDetails = async (req, res) => {
  try {
    let id = req.params.id;
    const ProjectDetails = await Project.findById(id);
    res.status(201).json({
      msg: "suceesfully retrived",
      data: ProjectDetails,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const listProjects = async (req, res) => {
  try {
    const listProject = await Project.find();
    res.status(201).json({
      msg: "suceesfully retrived",
      data: listProject,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateProject = async (req, res) => {
  try {
    let id = req.params.id;
    const updateProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      msg: "details updated succesfully",
      data: updateProject,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    await Todo.deleteMany({ _id: { $in: project.list_of_Todos } });
    const deleteDetails = await Project.findByIdAndDelete(projectId);
    res.status(200).json({
      msg: "Project and all related Todos deleted successfully",
      data: deleteDetails,
    });
  } catch (err) {
    res.status(400).json({ msg: "Error occurred", error: err.message });
  }
};

export {
  addDetails,
  updateProject,
  deleteProject,
  getProjectDetails,
  listProjects,
};
