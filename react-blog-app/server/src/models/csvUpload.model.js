import mongoose, { model, Schema } from "mongoose";

 const csvUploadSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    // totalBlogs: {
    //   type: Number,
    //   required: true,
    // },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    processedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    processedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const csvUpload =  model("csvUpload",csvUploadSchema)

export default csvUpload;