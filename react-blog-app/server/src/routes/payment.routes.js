import { Router } from "express";
import { createPayment, handleStripeWebhook } from "../controllers/payment.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router =  Router()
router.post(
  "/create-payment-intent",
  verifyToken,
  authenticateUser,
  createPayment
);

router.post('/webhook',handleStripeWebhook)

export default router;