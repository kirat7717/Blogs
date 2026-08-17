import { Router } from "express";
import {
  approveUploads,
  exportBlogs,
  getAllUsers,
  getCsvUploads,
  getSingleUser,
  importBlogs,
  loginAdmin,
  registerAdmin,
  rejectUploads,
  updateBlogStatus,
  updateUserStatus,
} from "../controllers/admin.controller.js";
import {
  deleteBlog,
  getBlogs,
  getSingleBlog,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/getUsers",verifyToken ,authenticateAdmin, getAllUsers);
router.get("/getUsers/:id",verifyToken ,authenticateAdmin, getSingleUser);

router.get("/blog",verifyToken ,authenticateAdmin, getBlogs);
router.get("/blog/:id",verifyToken ,authenticateAdmin, getSingleBlog);
router.get("/export-blogs",verifyToken ,authenticateAdmin, exportBlogs);
router.get("/csv-uploads",verifyToken ,authenticateAdmin, getCsvUploads);

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post(
  "/import-blogs",
  verifyToken,
  authenticateAdmin,
  upload("csv").single("csvFile"),
  importBlogs,
);

router.patch("/update-status/:id",verifyToken ,authenticateAdmin, updateUserStatus);
router.patch("/update-status/:id",verifyToken ,authenticateAdmin, updateBlogStatus);
router.patch("/csv-uploads/:uploadId/approve",verifyToken,authenticateAdmin,approveUploads,);
router.patch("/csv-uploads/:uploadId/reject",verifyToken,authenticateAdmin,rejectUploads,
);

export default router;
