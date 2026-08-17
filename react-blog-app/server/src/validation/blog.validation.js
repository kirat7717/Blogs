import Joi from "joi";

export const addBlogSchema = Joi.object({
  title: Joi.string().trim().min(3).max(150).required(),

  description: Joi.string().trim().min(10).required(),

  imageUrl: Joi.string().trim().uri().optional(),

  status: Joi.string()
    .trim()
    .lowercase()
    .valid("active", "hidden")
    .default("active"),
});
