import Project from "../models/projectSchema.js";

const addDetails = async (req,res)=>{
    try{
        const newProject = await Project.create(req.body)
        res.status(201).json({
            msg:"Details added succesfully",
            data:newProject
        })
    }
    catch(err){
        res.status(400).json(err)
    }
}

const getProjectDetails = async(req,res)=>{
  try{
     let id = req.params.id
      const ProjectDetails = await Project.find({_id:id})
      res.status(201).json({
          msg:"suceesfully retrived",
          data:ProjectDetails
      })
  } catch (err){
      res.status(400).json(err)
  }
  }

  const listProjects = async(req,res)=>{
    try{
        const listProject = await Project.find()
        res.status(201).json({
            msg:"suceesfully retrived",
            data:listProject
        })
    } catch (err){
        res.status(400).json(err)
    }
    }

const updateProject = async(req,res)=>{
    try{
        let id = req.params.id
            const updateProject = await Project.findByIdAndUpdate(id,req.body,{
              new:true,

             })
        res.status(201).json({
            msg:"Hospital details updated succesfully",
            data:updateProject
           
        })
    } catch (err) {
        res.status(400).json(err)
    }
}

const deleteProject = async (req, res) => {
    try {
      let id = req.params.id;
      const deleteDetails = await Project.findByIdAndDelete(id);
      res.status(201).json({
        msg:"records deleted succesfully",
        data:deleteDetails
      
      });
    } catch (err) {
      res.status(400).json(err);
    }
  };

export{addDetails,updateProject,deleteProject,getProjectDetails,listProjects}