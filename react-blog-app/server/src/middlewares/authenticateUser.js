import User from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status === "deactive") {
      return res.status(403).json({
        success: false,
        message: "No access. Your account has been banned.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};