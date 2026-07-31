import React from 'react'
import MessageBubble from "./MessageBubble";

function ChatMessages() {
  const messages = [
    {
      id: 1,
      message: "Hello 👋",
      isSender: false,
    },
    {
      id: 2,
      message: "Hi!",
      isSender: true,
    },
    {
      id: 3,
      message: "How are you?",
      isSender: false,
    },
    {
      id: 4,
      message: "I'm doing great 😊",
      isSender: true,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg.message}
          isSender={msg.isSender}
        />
      ))}
    </div>
  );
}

export default ChatMessages;