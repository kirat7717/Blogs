import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChatHeader from "../../components/Chat/ChatHeader";
import ChatMessages from "../../components/Chat/ChatMessages";
import MessageInput from "../../components/Chat/MessageInput";

import socket from "../../socket/socket";

import {
  getConversation,
  getMessages,
  sendMessage,
} from "../../service/chatService";

function ChatPage() {
  const { receiverId } = useParams();

  const [conversationId, setConversationId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // ==========================
  // Socket Connection
  // ==========================
  useEffect(() => {
  console.log("Calling socket.connect()");

  socket.connect();

  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  socket.on("receive_message", (message) => {
    console.log("Received Message:", message);

    setChatMessages((prev) => [...prev, message]);
  });

  return () => {
    socket.off("connect");
    socket.off("receive_message");
    socket.disconnect();
  };
}, []);

  // ==========================
  // Create/Get Conversation
  // ==========================
  useEffect(() => {
    setChatMessages([]);
    fetchConversation();
  }, [receiverId]);

  // ==========================
  // Fetch Messages
  // ==========================
  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  const fetchConversation = async () => {
    try {
      const response = await getConversation(receiverId);

      setConversationId(response.conversation._id);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await getMessages(conversationId);

      console.log("Response:", response);
      console.log("response messagge",response.messages[0]);
      setChatMessages(response.messages);
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Send Message
  // ==========================
 const handleSendMessage = async () => {
  if (!newMessage.trim()) return;

  try {
    const response = await sendMessage(
      conversationId,
      newMessage
    );

    console.log("API Response:", response);

    setChatMessages((prev) => [
      ...prev,
      response.data,
    ]);

    setNewMessage("");
  } catch (error) {
    console.error("Send Message Error:", error);
  }
};

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />

      <ChatMessages
        chatMessages={chatMessages}
      />

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default ChatPage;