import { useEffect, useState } from "react";
import { getOnlineUsers } from "../../service/chatService";
import UserTable from "../../components/Table/UserTable";
import { useNavigate } from "react-router-dom";

function Chat() {
    console.log("chat trender");
    
  const [users, setUsers] = useState([]);
 const navigate = useNavigate();
  useEffect(() => {
    fetchOnlineUsers();
  }, []);
  
  const handleChat = (receiverId ) => {
    navigate(`/chat/${receiverId }`);
  };

  const fetchOnlineUsers = async () => {
    try {
      const response = await getOnlineUsers();

      setUsers(response.users);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">
        Online Users
      </h1>

      <UserTable users={users}  onChat={handleChat} />
    </div>
  );
    
}

export default Chat;