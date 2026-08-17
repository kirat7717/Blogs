import { Schema, model } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: {
      type: String,
      default: null,
    },
      isPaid: {
      type: Boolean,
      default: false,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "hidden"],
      default: "active",
    },
  },
  { timestamps: true },
);

const Blog = model("Blog", BlogSchema);

export default Blog;
