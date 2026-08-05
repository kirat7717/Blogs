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
import { useSelector } from "react-redux";

function ChatPage() {
  const { receiverId } = useParams();

    const auth = useSelector((state) => state.auth);

    const currentUser = auth.user || JSON.parse(localStorage.getItem("user"));



  const [conversationId, setConversationId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null);
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

    const conversation = response.conversation;
 console.log("conversation",conversation);
//  console.log(response.conversation.participants);
    const receiverUser = conversation.participants.find(  
      (participant) =>
        participant._id !==
        currentUser._id
    );

    console.log("Receiver:", receiverUser);
    setConversationId(conversation._id);
    setReceiver(receiverUser);


  } catch (error) {
    console.error(error);
  }
};

  const fetchMessages = async () => {
    try {
      const response = await getMessages(conversationId);

      console.log("Response:", response);
      console.log("response messagge", response.messages[0]);
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
      const response = await sendMessage(conversationId, newMessage);

      console.log("API Response:", response);

      setChatMessages((prev) => [...prev, response.data]);

      setNewMessage("");
    } catch (error) {
      console.error("Send Message Error:", error);
    }
  };

return (
  // 'fixed inset-0' pins the container to all 4 corners of the screen.
  // 'z-50' ensures it renders on top of the global footer and navbar.
<div className="fixed inset-0 z-50 flex flex-col bg-gray-50 overflow-hidden overflow-x-hidden w-full">    <ChatHeader receiver={receiver} />
    
    <ChatMessages chatMessages={chatMessages} currentUser={currentUser} />
    
    <MessageInput
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      handleSendMessage={handleSendMessage}
    />
  </div>
);
}

export default ChatPage;
