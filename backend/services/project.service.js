import mongoose from 'mongoose';
import projectModel from '../models/project.model.js';

// function to crete a new project
export const createProject = async (
    name, userID
) => {
    if (!name) {
        throw new Error('Project name is required');
    }
    if (!userID) {
        throw new Error('User ID is required');
    }

    let project;
    try{
        project = await projectModel.create({
            name,
            users: [userID]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name must be unique');
        }
        throw error;
    }
    return project;

}
// function to get all projects by user id
export const getAllProjectsByUserId = async (userID) => {
    if (!userID) {
        throw new Error('User ID is required');
    }

    const allUserProjects = await projectModel.find({

        users: { $in: [userID]}
    })
return allUserProjects;
}  
// function to add users to a project 
export const addUsersToProject = async ({projectId, users, userId}) => {

    if (!projectId){
        throw new Error("projecrId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("users are required")
    }

    if (!users) {
        throw new Error("users are required")
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }

    if (!userId){
        throw new Error("users is required")
    }

    if (!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("Invalid userId")
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })

    if (!project){
        throw new Error("User not blong to this project")
    }

    const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    },{
        new: true
    }
)
return updatedProject

}
export const getProjectById = async (projectId, userId) => {
    if (!projectId) {
        throw new Error('Project ID is required');
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project ID');
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    }).populate('users')

    if (!project) {
        throw new Error('Project not found or user not authorized');
    }

    return project;
};