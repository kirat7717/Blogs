import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver Id is required",
      });
    }

    // Check if a conversation already exists between the two users.
    // Populate participants so the frontend receives user details
    // instead of only ObjectId references.
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    }).populate("participants", "username email online");

    // If no conversation exists, create a new one.
    if (!conversation) {
      const newConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });

      // Populate participants to keep the API response
      // consistent with existing conversations.
      conversation = await Conversation.findById(newConversation._id)
        .populate("participants", "username email online");
    }
    
    // Return the conversation with a consistent response structure.
    return res.status(200).json({
      success: true,
      message: "Conversation retrieved successfully", 
      conversation,
    });

  } catch (error) {
    console.error("Conversation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Populate participant details so the frontend receives complete user
// information instead of only ObjectId references. This keeps the API
// response consistent and allows the UI to display usernames, avatars,
// and other user data without extra requests.
