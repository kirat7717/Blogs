import User from "../models/user.model.js";
import csvUpload from "../models/csvUpload.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import {
  sendmail_For_ResetPassword,
  sendmail_For_Verification,
} from "../utils/sendEmail.js";
import { updateProfileSchema, userRegisterSchema } from "../validation/user.validation.js";
import { sendVerificationEmail } from "../utils/verification.helper.js";
import upload from "../middlewares/multer.js";
import { parseCSV } from "../services/csv.service.js";

export const registerUser = async (req, res) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await sendVerificationEmail(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.IsVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.status === "deactive") {
      return res.status(403).json({
        message: "No access. Your account has been banned.",
      });
      // code here
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user.online = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          IsVerified: user.IsVerified,
          profileImage:user.profileImage
        },
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      message: "Profile fetched successfully",
      data: {
        username: user.username,
        email: user.email,
        profileImage:user.profileImage
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const requestResetPassword = async (req, res) => {
  // request for reset password
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "please enter the email",
      });
    }

    const IsUser = await User.findOne({ email });

    if (!IsUser) {
      return res.status(404).json({
        message: "user is not exist",
      });
    }

    const token = jwt.sign({ userId: IsUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const resetPasswordUrl = `http://localhost:3000/reset-password/${token}`;
    IsUser.resetPasswordToken = token;
    IsUser.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await IsUser.save();

    //send mail
    await sendmail_For_ResetPassword(IsUser.email, resetPasswordUrl);

    return res.status(200).json({
      message: "user fetched",
      resetPasswordUrl,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const ResetPassword = async (req, res) => {
  // change the password
  try {
    const { token } = req.params;

    const { password, confirmPassword } = req.body;

    if (!token) {
      return res.status(404).json({
        message: "token not found",
      });
    }

    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "please fill password and confirm password",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "please correct the confirm password",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decode.userId;

    const IsUser = await User.findOne({
      _id: userId,
      resetPasswordToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!IsUser) {
      return res.status(404).json({
        message: "User not exist or token expire",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    IsUser.password = hashedPassword;
    IsUser.resetPasswordToken = "";
    IsUser.resetTokenExpiry = "";
    await IsUser.save();

    return res.status(200).json({
      message: "Password updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.IsVerified) {
      return res.status(409).json({
        success: false,
        message: "Email is already verified",
      });
    }

    user.IsVerified = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        username: user.username,
        IsVerified: user.IsVerified,
      },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const decoded = jwt.decode(token);

      const user = await User.findById(decoded.userId);

      if (user && !user.IsVerified) {
        await sendVerificationEmail(user);
      }

      return res.status(401).json({
        message:
          "Verification link expired. A new verification email has been sent.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid verification token",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userCsvImport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required.",
      });
    }

    const file = req.file;
    console.log(req.file.path);

    const csvUploadRecord = await csvUpload.create({
      uploadedBy: req.user._id,
      fileName: file.originalname,
      filePath: file.path,
      status: "Pending",
    });
    return res.status(201).json({
      success: true,
      message: "CSV uploaded successfully. Waiting for admin approval.",
      data: csvUploadRecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOnlineUsers = async (req, res) => {
  try {
    console.log(" ");

    const loggedInUserId = req.auth.userId;

    const users = await User.find({
      _id: { $ne: loggedInUserId },
      online: true,
    }).select("username email online");

    return res.status(200).json({
      success: true,
      message: "Online users fetched successfully.",
      users,
    });
  } catch (error) {
    console.error("Get Online Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.online = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { error, value } = updateProfileSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { username, email } = value;

    const user = req.user;

    if (username !== undefined) {
      user.username = username;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (req.file) {
      user.profileImage = `http://localhost:3000/public/user-images/${req.file.filename}`;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile.",
    });
  }
};