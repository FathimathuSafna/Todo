import Project from "../models/projectSchema.js";

const addProject = async (req, res) => {
  const { title } = req.body;
  try {
    let existProject = await Project.findOne({ title });

    if (!existProject) {
      const newProject = await Project.create(req.body);
      res.status(201).json({
        status: "success",
        success: true,
        message: "Project Created Successfully",
        data: newProject,
      });
    } else {
      res.status(400).json({
        status: "failed",
        success: false,
        message:
          "Project name should be unique, project already exist with same name",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      success: false,
      message: err.message,
    });
  }
};

const getProjectDetails = async (req, res) => {
  try {
    let id = req.params.id;
    const project = await Project.findById(id);

    res.status(201).json({
      status: "success",
      success: true,
      message: "succesfully Retrived Projects",
      data: project
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
        status: "failed",
        success: false,
        message: err.message,
      });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const listProject = await Project.find();

    res.status(201).json({
      status: "success",
      success: true,
      message: "succesfully Retrived Projects",
      data: listProject,
    });
  } catch (err) {
    res.status(400).json({
        status: "failed",
        success: false,
        message: err.message,
      });
  }
};

const updateProject = async (req, res) => {
  try {
    let id = req.params.id;

    const updateProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      success: true,
      message: "Details Updated succesfully",
      data: updateProject,
    });
  } catch (err) {
    res.status(400).json({
        status: "failed",
        success: false,
        message: err.message,
      });
  }
};

const deleteProject = async (req, res) => {
  try {
    let id = req.params.id;

    await Project.findByIdAndDelete(id);

    res.status(201).json({
      status: "success",
      success: true,
      message: "records deleted succesfully",
    });
  } catch (err) {
    res.status(400).json({
        status: "failed",
        success: false,
        message: err.message,
      });
  }
};

export {
  addProject,
  updateProject,
  deleteProject,
  getProjectDetails,
  getAllProjects,
};
