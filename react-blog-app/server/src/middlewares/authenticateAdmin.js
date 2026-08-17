import Admin from "../models/admin.model.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.auth.adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};