import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";


function ChatMessages({ chatMessages, currentUser }) {
  console.log("Current User:", currentUser);
  console.log("Local User:", JSON.parse(localStorage.getItem("user")));
   const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

  return (
  // 'flex flex-col' stacks the messages.
  // 'gap-2' ensures a strict, consistent spacing between every bubble.
  <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f0f2f5] flex flex-col gap-2">
    {chatMessages.map((msg) => (
      <MessageBubble
        key={msg._id}
        message={msg.message}
        // IDs are already serialized as strings in the API response,
     // allowing a direct comparison without toString().
        // isSender={msg.senderId._id.toString() === currentUser._id.toString()}
        isSender={msg.senderId._id === currentUser._id}
      />
    ))}
      {/* Invisible element used for auto-scrolling */}
      <div ref={bottomRef}></div>
  </div>
);
}



export default ChatMessages


