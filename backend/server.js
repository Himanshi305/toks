import dotenv from "dotenv/config";
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import ProjectModel from "./models/project.model.js";
import { main } from "./services/ai.service.js";
import e from "express";

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

io.use(async (socket, next) => {
  try {
    const token =
      socket.handshake.auth.token ||
      socket.handshake.headers.authorization?.split(" ")[1];
    // Here you can add your token verification logic
    const projectId = socket.handshake.query.projectId;
    // Do not log raw tokens. Log only whether a token was provided to avoid leaking secrets.
    const tokenPresent =
      !!(
        socket.handshake &&
        socket.handshake.auth &&
        socket.handshake.auth.token
      ) || !!socket.handshake.headers?.authorization;
    console.log(
      "socket handshake incoming, projectId=",
      projectId,
      "tokenPresent=",
      tokenPresent
    );
    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Invalid projectId"));
    }
    socket.project = await ProjectModel.findById(projectId);
    // attach sanitized projectId to the socket for later use
    socket.projectId = String(projectId);

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new Error("Authentication error"));
    }
    // If token is valid, proceed
    socket.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.join(socket.projectId);

  socket.on("project-message", async (data) => {
    const message = data.message;

    const aiIsPresnetInMessage = message.includes("@ai");

    if (aiIsPresnetInMessage) {
      const prompt = message.replace("@ai", "").trim();

      const result = await main(prompt);

      io.to(socket.projectId).emit("project-message", {
        message: result,
        sender: "AI",
        senderName: "AI Assistant",
      });
      return;
    }

    console.log("project-message received:", data);
    // Broadcast to other sockets in the project room (exclude sender).
    socket.broadcast.to(socket.projectId).emit("project-message", {});
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.leave(socket.projectId);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
