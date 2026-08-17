import React from "react";

function ChatHeader({ receiver }) {
  console.log("chat header");
  console.log("receiver caht hADEE", receiver);

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm z-10">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center text-xl shadow-inner">
            👤
          </div>
          {/* Online Indicator */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
<h2 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight truncate w-40 sm:w-auto">            {receiver?.username || "Loading..."}
          </h2>
          <p
            className={`text-sm ${
              receiver?.online ? "text-green-600" : "text-gray-500"
            }`}>
            {receiver ? (receiver.online ? "Online" : "Offline") : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
