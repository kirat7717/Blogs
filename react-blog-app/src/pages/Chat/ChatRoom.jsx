import React, { use } from 'react'
import { useParams } from 'react-router-dom'

import ChatHeader from "../../components/Chat/ChatHeader";
import ChatMessages from "../../components/Chat/ChatMessages";
import MessageInput from "../../components/Chat/MessageInput";


function ChatRoom() {
    const {userId} =  useParams()
  return (
    <>

    <div>ChatRoom - {userId}</div>
     <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-xl shadow-lg flex flex-col">
        <ChatHeader />

        <ChatMessages />

        <MessageInput />
      </div>
    </div>
    </>
  )
}

export default ChatRoom