import express from "express";
import {
  sendMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

router.post("/",verifyToken,authenticateUser, sendMessage);

router.get("/:conversationId",verifyToken,authenticateUser, getMessages);

export default router;