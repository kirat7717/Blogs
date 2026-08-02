import React from "react";

function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          👤
        </div>

        <div>
          <h2 className="font-semibold text-lg">Chat</h2>

          <p className="text-green-600 text-sm">Online</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
