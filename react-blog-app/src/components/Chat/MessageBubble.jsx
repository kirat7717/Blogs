import React from 'react'
function MessageBubble({ message, isSender }) {
  return (
    <div
      className={`flex mb-3 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-xl max-w-xs ${
          isSender
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default MessageBubble;