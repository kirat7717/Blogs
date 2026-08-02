import React from 'react'
import { useState } from "react";

function MessageInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) {
  return (
    <div className="border-t p-4 flex gap-3 bg-white">

      <input
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) =>
          setNewMessage(e.target.value)
        }
        className="flex-1 border rounded-lg px-4 py-2 outline-none"
      />

      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-6 rounded-lg"
      >
        Send
      </button>

    </div>
  );
}

export default MessageInput;