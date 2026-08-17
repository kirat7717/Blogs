import { Router } from "express";
import { createPayment } from "../controllers/payment.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router =  Router()
router.post(
  "/create-payment-intent",
  verifyToken,
  authenticateUser,
  createPayment
);

export default router;