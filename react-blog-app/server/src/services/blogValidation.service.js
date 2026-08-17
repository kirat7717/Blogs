import { addBlogSchema } from "../validation/blog.validation.js";

const validateBlogs = (blogs) => {
    console.log("enter validation");
    
  const validBlogs = [];
  const invalidBlogs = [];

  blogs.forEach((blog, index) => {
    const { error, value } = addBlogSchema.validate(blog, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      invalidBlogs.push({
        row: index + 2, // +2 because row 1 is the CSV header
        data: blog,
        errors: error.details.map((err) => err.message),
      });
    } else {
      validBlogs.push(value);
    }
  });

  return {
    totalRows: blogs.length,
    validBlogs,
    invalidBlogs,
  };
};

export default validateBlogs;