import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

export const getOnlineUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/user/online-users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getConversation = async (
  receiverId
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/conversations`,
    {
      receiverId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMessages = async (
  conversationId
) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/messages/${conversationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const sendMessage = async (
  conversationId,
  message
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/messages`,
    {
      conversationId,
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};