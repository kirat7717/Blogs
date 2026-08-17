import api from "../api/axios";

export const getProfile = async () => {
  const response = await api.get("/user/profile");

  return response.data;
};
export const updateProfile = async (formData) => {
  const response = await api.patch("/user/profile", formData);
  return response.data;
};