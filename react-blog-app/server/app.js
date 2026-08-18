import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import userRoutes from "./src/routes/user.routes.js";
import blogRoutes from "./src/routes/blogs.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import conversationRoutes from "./src/routes/conversation.routes.js";
import messageRoutes from "./src/routes/message.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";

import swaggerSpec from "./src/configs/swagger.config.js";

const app = express();

// Keep Stripe webhook body raw for signature verification
app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" })
)

// Middlewares
// Serve uploaded images from the public folder
app.use("/public", express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/payment", paymentRoutes);
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/", blogRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/payment", paymentRoutes);

export default app;
