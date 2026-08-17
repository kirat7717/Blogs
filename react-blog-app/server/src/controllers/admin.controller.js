import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import {
  adminLoginSchema,
  adminRegisterSchema,
} from "../validation/admin.validation.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import { sendmail_For_Status } from "../utils/sendEmail.js";
import { parseCSV, exportCSV } from "../services/csv.service.js";
import validateBlogs from "../services/blogValidation.service.js";
import csvUpload from "../models/csvUpload.model.js";

export const registerAdmin = async (req, res) => {
  try {
    const { error } = adminRegisterSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { username, password, email } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: {
        id: createAdmin._id,
        username: createAdmin.username,
        email: createAdmin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { error } = adminLoginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).lean();
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin does not exist",
      });
    }

    const decodePassword = await bcrypt.compare(password, admin.password);

    if (!decodePassword) {
      return res.status(401).json({
        success: false,
        message: "please enter correct password",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successfully",
      data: {
        adminId: admin._id,
        username: admin.username,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .lean()
      .select("-password")
      .sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(200).json({
        message: "no users",
        data: [],
      });
    }
    return res.status(200).json({
      message: " users are fetched",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean().select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password -__v");
    if (!user) {
      return res.status(404).json({
        message: "User not exist",
      });
    }

    if (user.status === "active") {
      user.status = "deactive";
      await user.save();
    } else {
      user.status = "active";
      await user.save();
    }
    //send mail
    await sendmail_For_Status(user.email, user.status);

    return res.status(200).json({
      message: "status update successfully",
      data: {
        userId: user._id,
        status: user.status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateBlogStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).select("-__v");
    if (!blog) {
      return res.status(404).json({
        message: "User not exist",
      });
    }

    if (blog.status === "active") {
      blog.status = "deactive";
      await blog.save();
    } else {
      blog.status = "active";
      await blog.save();
    }

    return res.status(200).json({
      message: "status update successfully",
      data: {
        blogId: blog._id,
        status: blog.status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const importBlogs = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required.",
      });
    }

    const blogs = await parseCSV(req.file.path);

    const result = validateBlogs(blogs);

    if (result.validBlogs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid blogs found.",
        errors: result.invalidBlogs,
      });
    }
    await Blog.insertMany(result.validBlogs);

    return res.status(201).json({
      success: true,
      message: "Blogs imported successfully.",
      totalRows: result.totalRows,
      inserted: result.validBlogs.length,
      failed: result.invalidBlogs.length,
      errors: result.invalidBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const exportBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().select("-__v").lean().cursor();

    exportCSV(blogs, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCsvUploads = async (req, res) => {
  try {
    const uploads = await csvUpload.find().lean();

    if (uploads.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No CSV uploads found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "CSV uploads fetched successfully.",
      data: uploads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveUploads = async (req, res) => {
  try {
    // 1. Get upload ID from request parameters
    const { uploadId } = req.params;

    // 2. Find the uploaded CSV record
    const upload = await csvUpload.findById(uploadId);

    // 3. Check if the upload exists
    if (!upload) {
      return res.status(404).json({
        success: false,
        message: "CSV upload not found.",
      });
    }

    // 4. Prevent approving the same upload multiple times
    if (upload.status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "CSV is already approved.",
      });
    }

    // 5. Read and parse the CSV file
    const blogs = await parseCSV(upload.filePath);

    // 6. Validate the parsed blog data
    const { validBlogs, invalidBlogs, totalRows } = validateBlogs(blogs);

    // 7. Stop if there are no valid blogs to import
    if (validBlogs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid blogs found.",
        errors: invalidBlogs,
      });
    }

    // 8. Insert all valid blogs into the Blog collection
    await Blog.insertMany(validBlogs);

    // 9. Update CSV upload status and approval details
    upload.status = "Approved";
    upload.processedBy = req.admin._id;
    upload.processedAt = new Date();

    // 10. Save the updated upload record
    await upload.save();

    // 11. Send success response
    return res.status(200).json({
      success: true,
      message: "CSV approved and blogs imported successfully.",
      data: {
        upload,
        totalRows,
        inserted: validBlogs.length,
        failed: invalidBlogs.length,
        errors: invalidBlogs,
      },
    });
  } catch (error) {
    // 12. Handle unexpected server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const rejectUploads = async (req, res) => {
  
  try {
   const {reason} = req.body 
   const {uploadId} = req.params
    const upload = await csvUpload.findById(uploadId)
    if (!upload) {
      return res.status(404).json({
        success: false,
        message: "CSV upload not found.",
      });
    }

    if (upload.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "CSV is already rejected.",
      });
    }

    upload.status = "Rejected"
    upload.rejectionReason = reason;
    upload.processedBy = req.admin._id;
    upload.processedAt = new Date();
    await upload.save()
   

      // 7. Return success response
    return res.status(200).json({
      success: true,
      message: "CSV upload rejected successfully.",
      data: upload,
    });
  } catch (error) {
    // 12. Handle unexpected server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



