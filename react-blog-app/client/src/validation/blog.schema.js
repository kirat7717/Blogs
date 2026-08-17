import {z} from "zod";


export const addBlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description cannot exceed 1000 characters"),
});