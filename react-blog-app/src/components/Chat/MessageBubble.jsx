function MessageBubble({
  message,
  isSender,
}) {
  return (
    <div
      className={`flex mb-3 ${
        isSender
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[70%]
          px-4
          py-2
          rounded-2xl
          shadow-sm
          break-words
          ${
            isSender
              ? "bg-blue-500 text-white rounded-br-md"
              : "bg-gray-200 text-gray-900 rounded-bl-md"
          }
        `}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MessageBubble;