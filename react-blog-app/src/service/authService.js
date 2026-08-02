import axios from "axios";

export const loginUser = async (credentials) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/user/login",
    credentials
  );

  return response;
};


export const logoutUser = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:3000/api/v1/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};