import Joi from "joi";

export const createPaymentIntentSchema = Joi.object({
  blogId: Joi.string().required().messages({
    "any.required": "Blog ID is required.",
    "string.empty": "Blog ID cannot be empty.",
  }),
});