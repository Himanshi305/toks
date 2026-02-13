"use client";
import { io } from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {

  socketInstance = io("https://toks-2.onrender.com", {
    auth: {
      token: localStorage.getItem("token")
    },
    query: {
      projectId: projectId,
    },
    transports: ['websocket'], // Use WebSocket transport
  }); // Replace with your server URL
  return socketInstance;
};

export const receiveMessage = (eventName, callback) => {
  socketInstance.on(eventName, callback);
};

export const sendMessage = (eventName, data) => {
  socketInstance.emit(eventName, data);
};

export const offMessage = (eventName, callback) => {
  if (socketInstance) {
    socketInstance.off(eventName, callback);
  }
};
