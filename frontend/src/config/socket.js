import project from "@/app/project/[id]/page";
import { io } from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {

  socketInstance = io("http://localhost:3000","https://toks-2.onrender.com", {
    auth: {
      token: localStorage.getItem("token")
    },
    query: {
      projectId: projectId,
    },
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
