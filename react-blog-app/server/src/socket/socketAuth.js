import jwt from "jsonwebtoken";
import "dotenv/config";

const socketAuth = (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach logged-in user to socket

    socket.user = {
      userId: decode.userId,
    };
    next();
  } catch (error) {
    return next(new Error("Authentication failed"));
  }
};

export default socketAuth;
