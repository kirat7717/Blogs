  import { Router } from "express";
  import {
    addBlog,
    deleteBlog,
    getBlogs,
    getSingleBlog,
    myBlogs,
    updateBlog,
    uploadImage,
  } from "../controllers/blog.controller.js";
  import upload from "../middlewares/multer.js";
  import { verifyToken } from "../middlewares/verifyToken.js";
  import { authenticateUser } from "../middlewares/authenticateUser.js";

  const router = Router();

  router.post("/blog", verifyToken,authenticateUser ,addBlog);
  router.post(
  "/upload-image",
  upload("blog").single("image"),
  uploadImage
);
  router.get("/blog", getBlogs);
  router.get("/my-blog", verifyToken,authenticateUser ,myBlogs);
  router.get("/blog/:id", getSingleBlog);
  router.patch("/blog/:id", verifyToken,authenticateUser ,updateBlog);
  router.delete("/blog/:id", verifyToken,authenticateUser ,deleteBlog);

  export default router;
