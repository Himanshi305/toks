import projectModel from '../models/project.model.js';
import * as projectService from '../services/project.service.js';
import {validationResult} from 'express-validator';
import userModel from '../models/user.model.js';

export const createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
    const { name, email } = req.body;
    const loggedInUser = await userModel.findOne({email})

    const userID = loggedInUser._id;

    const newPorject = await projectService.createProject(
        name, userID
    );
    res.status(201).json(newPorject);}
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}