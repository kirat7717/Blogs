import { Server } from "socket.io";
import "dotenv/config";
import socketAuth from "./socketAuth.js";

// Stores online users
// Key   -> userId
// Value -> socket.id
export const connectedUsers = new Map();

// Export io so controllers can emit socket events
export let io;

export const setupWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // Authenticate every socket connection
  io.use(socketAuth);

  io.on("connection", (socket) => {  
    console.log(`User Connected: ${socket.id}`);

    const userId = socket.user.userId;

    connectedUsers.set(userId, socket.id);

    console.log("======================");
    console.log("Socket Connected");
    console.log("User ID:", socket.user.userId);
    console.log("Socket ID:", socket.id);

    connectedUsers.set(socket.user.userId, socket.id);

    console.log("Online Users:", [...connectedUsers.entries()]);
    console.log("======================");

    socket.on("disconnect", () => {
      connectedUsers.delete(userId);

      console.log(`${userId} disconnected`);
      console.log("Online Users:", connectedUsers);
    });
  });
};


