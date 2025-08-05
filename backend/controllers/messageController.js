import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const message = req.body.message;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    // implement socket io for realtime data transfer
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //to ka matleb kis ke pass ye comment real time me dena h
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({
      success: true,
      message: "message send successfully",
      message: newMessage,
    });
  } catch (error) {
    console.log(`Server error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({
        success: true,
        message: "No conversation yet",
        messages: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      messages: conversation?.messages,
    });
  } catch (error) {
    console.log(`Server error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
