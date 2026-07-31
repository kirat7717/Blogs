import axios from "axios";

export const getOnlineUsers = async () => {
  const token = localStorage.getItem("token");

  console.log("Token:", token);

  const response = await axios.get(
    "http://localhost:3000/api/v1/user/online-users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};