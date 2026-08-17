import api from "../api/axios";

export const getMyBlogs = async () => {
  const response = await api.get("/my-blog");

  return response.data;
};

export const getAllBlogs = async () => {
  const response = await api.get("/blog");

  return response.data;
};
export const createBlog = async (blogData) => {
  const response = await api.post("/blog", blogData);

  return response.data;
};

export const getSingleBlog = async (id) => {
  const response = await api.get(`/blog/${id}`);

  return response.data;
};
export const uploadBlogImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await api.post("/upload-image", formData);

  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await api.patch(`/blog/${id}`, blogData);

  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blog/${id}`);
  return response.data;
};