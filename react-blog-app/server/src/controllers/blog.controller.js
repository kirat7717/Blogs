import Blog from "../models/blog.model.js";

import { addBlogSchema } from "../validation/blog.validation.js";

export const addBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    // const { title, description, imageUrl } = req.body;

    //     if (!title || !description || !imageUrl) {
    //       return res.status(400).json({
    //         message: "Title and description , imageUrl are required ",
    //       });
    //     }
    const { error } = addBlogSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    // Get blog data from the request body
    const { title, description, imageUrl } = req.body;
    const CreateBlog = await Blog.create({
      title,
      description,
      imageUrl,
      authorId: userId,
    });

    return res.status(201).json({
      message: "Blog is created",
      data: CreateBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const uploadImage = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      // Return a complete URL because Joi validates imageUrl as a URI

      imageUrl: `http://localhost:3000/public/${image.filename}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while uploading the image.",
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.find()
      .lean() //{status : "active"}
      .populate("authorId", "username email")
      .sort({ createdAt: -1 });

    if (!blog) {
      return res.status(404).json({
        message: "Blogs not found",
      });
    }

    return res.status(200).json({
      message: "Blogs fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const myBlogs = async (req, res) => {
  try {
    const userId = req.user._id;

    const blogs = await Blog.find({ authorId: userId })
      .lean()
      .populate("authorId", "username email")
      .select("-__v");

    return res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({ _id: id, status: "active" })
      .lean()
      .populate("authorId", "username email ")
      .select("-__v -updatedAt");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog retrieved successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "blog not exist",
      });
    }

    if (blog.authorId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this blog",
      });
    }

    await blog.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
const allowedfields = ["title", "description", "imageUrl"];
    const userId = req.user._id;
    const blogId = req.params.id;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update",
      });
    }
    // const blog = await Blog.findById(blogId);
    // if (!blog) {
    //   return res.status(404).json({
    //     message: "Blog not exist",
    //   });
    // }

    // if (blog.authorId.toString() !== userId.toString()) {
    //   return res.status(403).json({
    //     message: "You are not authorized to perform this action",
    //   });
    // }

    let updateData = {};
    const keys = Object.keys(req.body);
    for (const field of allowedfields) {
      if (field in req.body) {
        updateData[field] = req.body[field];
      }
    }

    const updateBlog = await Blog.findOneAndUpdate(
      {
        _id: blogId,
        authorId: userId,
      },
      {
        $set: updateData,
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "blog updates successfully",
      data: updateBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
