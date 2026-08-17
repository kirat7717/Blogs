import express from "express";
import {createConversation}  from "../controllers/conversation.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

router.post("/", verifyToken,authenticateUser, createConversation);

export default router;