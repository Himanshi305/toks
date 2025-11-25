import projectModel from '../models/project.model.js';
import * as projectService from '../services/project.service.js';
import {validationResult} from 'express-validator';
import userModel from '../models/user.model.js';

export const createProject = async (req, res) => {
    console.log('--- INSIDE CREATE PROJECT CONTROLLER ---');
  console.log('Value of req.user:', req.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
    const { name } = req.body;

    const userID = req.user._id;

    const newPorject = await projectService.createProject(
        name, userID
    );
    res.status(201).json(newPorject);}
    catch (error) {
    console.error('PROJECT CREATION FAILED:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
}

export const getAllProjects = async (req, res) => {
  try {
    const loggedInUserId = await userModel.findOne({
      email: req.user.email
    })
    const allUserProjects = await projectService.getAllProjectsByUserId(loggedInUserId._id);

    res.status(200).json({
      projects: allUserProjects
    });
  }
  catch(error) {
    console.error('ERROR FETCHING PROJECTS:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch projects' });
  }
}

export const addUserToProject = async (req, res) =>{
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    // return validation errors from express-validator
    return res.status(400).json({ errors: errors.array() });
  }
  try{
      const {projectId, users} = req.body

      const loggedInUser = await userModel.findOne({
        email: req.user.email
      })


      const project = await projectService.addUsersToProject({
        projectId,
        users,
        userId: loggedInUser._id
      })
      return res.status(200).json({
        project,
      })
  }
  catch(error){
    console.log(error)
    res.status(400).json({error : error.message})
  }
}
export const getProjectById = async (req, res) => {
const { projectId } = req.params;
try {
  const project = await projectService.getProjectById(projectId, req.user._id);

  return res.status(200).json({ project });
}
catch (error) {
  console.error('ERROR FETCHING PROJECT BY ID:', error);
  return res.status(400).json({ error: error.message || 'Failed to fetch project' });
}}
