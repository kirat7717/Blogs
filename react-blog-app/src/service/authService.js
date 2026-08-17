import api from "../api/axios";

export const registerUser = async (userData) => {
  const response = await api.post("/user/register", userData);

  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/user/login", credentials);

  return response.data;
};

export const logoutUser = async () => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};