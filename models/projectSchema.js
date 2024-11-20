import mongoose from 'mongoose'

var Schema = mongoose.Schema
var projectSchema = new Schema({
    Title:{
    type:String,
    required:true
},
List_of_Todos :
   [{type:Schema.Types.ObjectId,
    ref:'Todo'
   }]
 }, {
    timestamps:true
  }
)

const Project = mongoose.model("Project",projectSchema)
export default Project