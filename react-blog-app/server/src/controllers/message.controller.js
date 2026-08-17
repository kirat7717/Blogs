import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io, connectedUsers } from "../socket/index.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;

    const { conversationId, message } = req.body;

    if (!conversationId || !message) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID and message are required",
      });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    const newMessage = await Message.create({
      conversationId,
      senderId,
      message,
    }); 
    // Populate sender details
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId", "username email");
    // Find receiver from conversation participants
    const receiverId = conversation.participants.find(
      (participant) => participant.toString() !== senderId.toString(),
    );

    // Find receiver's socket id
    const receiverSocketId = connectedUsers.get(receiverId.toString());

    // Send message only if receiver is online
    console.log("Sender:", senderId.toString());
    console.log("Receiver:", receiverId.toString());
    console.log("Receiver Socket:", receiverSocketId);

    if (receiverSocketId) {
      console.log("✅ Emitting receive_message");

      io.to(receiverSocketId).emit("receive_message", populatedMessage);
    } else {
      console.log("❌ Receiver socket not found");
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: populatedMessage,
    });
  } catch (error) {
    console.error("Send Message Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    const messages = await Message.find({
      conversationId,
    })
      .populate("senderId", "username email")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
