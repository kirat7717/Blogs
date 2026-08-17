import Joi from "joi";

export const userRegisterSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required" : "Username is required",
    "string.empty" : "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required" : "Email is required",
    "string.empty" : "Email is required",
    "string.email" :"Please enter valid email "
  }),

  password:Joi.string().min(5).required().messages({
    "any.required" : "Password is required",
    "string.empty" : "password is required",
    "string.min": "Password must be at least 6 characters",
  })
});
export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
}).min(1);