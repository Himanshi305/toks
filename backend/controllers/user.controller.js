import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";
import { authUser } from "../middleware/auth.middleware.js";

//for registration
export const createUserController = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userService.createUser(req.body);
    const token = await user.generateJWT();

    delete user._doc.password;

    res.status(201).json({ user, token });
  } catch (error) {
    console.error("REGISTRATION FAILED:", error); // <-- ADD THIS LINE
    res.status(500).json({ message: "Something went wrong" });
  }
};
//for login
export const loginUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        errors: "Invalid credentials",
      });
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        errors: "Invalid credentials",
      });
    }

    const token = await user.generateJWT();

    res.cookie("token", token, {
      httpOnly: true, // cannot be accessed by JS
      secure: true, // required for HTTPS (Render)
      sameSite: "none", // required for cross-origin
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    // Remove password before sending user object
    delete user._doc.password;

    // Send response
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("LOGIN FAILED:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
//for profile
export const profileController = async (req, res) => {
  console.log(req.user);

  res.status(200).json({ user: req.user });
};
//for logout
export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    redisClient.set(token, "logout", "EX", 3600);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// those who have logged in
export const getAllUsersController = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    const allusers = await userService.getAllUsers({
      userId: loggedInUser._id,
    });

    res.status(200).json({ users: allusers });
  } catch (error) {
    console.error("GET ALL USERS FAILED:", error);
    res.status(400).json({ error: error.message });
  }
};

export const updateAvatarController = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const avatarURL = `/uploads/avatars/${req.file.filename}`;

    await User.findByIdAndUpdate(req.user._id, { avatar: avatarURL });

    res.json({ message: "Avatar updated", avatar: avatarURL });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
