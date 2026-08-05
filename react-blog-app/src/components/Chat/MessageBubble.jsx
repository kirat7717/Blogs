function MessageBubble({ message, isSender }) {
  return (
    <div
      className={`flex w-full mb-1 sm:mb-2 ${
        isSender ? "justify-end" : "justify-start"
      }`}>
      <div
        className={`
    max-w-[85%] sm:max-w-[70%] 
    min-w-0 /* 👈 ADD THIS: Allows flex child to shrink below content size */
    px-4 py-2 
    rounded-2xl 
    shadow-sm 
    break-words 
    break-all /* 👈 ADD THIS: Forces long unbroken text to wrap */
    text-[15px] leading-relaxed
    ${
      isSender
        ? "bg-blue-600 text-white rounded-br-sm"
        : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
    }
  `}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
