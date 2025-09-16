import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: {true: 'Project name must be unique'},
    trim: true,
    lowercase: true,
  },

  users:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  }
});


const Project = mongoose.model("Project", projectSchema);

export default Project;