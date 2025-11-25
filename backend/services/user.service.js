import userModel from '../models/user.model.js';

// creating a new user
export const createUser = async ({
    email,password
})=>{
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        email,
        password: hashedPassword
    });
    return user;
}
//those who havn't logged in
export const getAllUsers = async ({userId}) => {
    const users = await userModel.find({
        _id: { $ne: userId },
        }
    );
    return users;
}