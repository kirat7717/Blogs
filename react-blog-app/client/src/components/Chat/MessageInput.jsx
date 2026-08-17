import React from "react";

function MessageInput({ newMessage, setNewMessage, handleSendMessage }) {
  return (
    // 'w-full box-border' ensures the parent never exceeds screen width
    <div className="bg-gray-100 p-3 sm:p-4 flex items-center gap-2 border-t border-gray-200 w-full box-border">
      
      {/* 👈 Added 'min-w-0' to force the flex container to shrink on small screens */}
      <div className="flex-1 min-w-0 flex items-center bg-white rounded-full px-4 py-2 sm:py-3 shadow-sm border border-gray-300 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          // 👈 Added 'min-w-0' to override the browser's default input width
          className="flex-1 bg-transparent outline-none text-gray-700 text-sm sm:text-base w-full min-w-0"
        />
      </div>

      <button
        onClick={handleSendMessage}
        disabled={!newMessage.trim()}
        className={`p-3 sm:px-6 sm:py-3 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 ease-in-out
          ${
            newMessage.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        <span className="hidden sm:inline font-medium">Send</span>
        <svg 
          className="w-5 h-5 sm:hidden" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
}

export default MessageInput;