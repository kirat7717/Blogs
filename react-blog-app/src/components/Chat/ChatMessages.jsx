import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";

function ChatMessages({ chatMessages }) {
  const auth = useSelector((state) => state.auth);

  const currentUser = auth.user || JSON.parse(localStorage.getItem("user"));

  console.log("Redux Auth State:", auth);
  console.log("Current User:", currentUser);
  console.log("Auth:", auth);
console.log("Current User:", currentUser);
console.log("Local User:", JSON.parse(localStorage.getItem("user")));
 
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {chatMessages.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg.message}
          isSender={
            (msg.senderId?._id || msg.senderId)?.toString() ===
            currentUser?._id?.toString()
          }
        />
      ))}
    </div>
  );
}

export default ChatMessages;
