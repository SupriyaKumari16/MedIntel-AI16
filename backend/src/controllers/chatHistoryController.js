import Chat from "../models/Chat.js";

// Load Chat History
export const getChatHistory = async (req, res) => {
  try {
    const patientId = req.user.id;

    const chat = await Chat.findOne({ patientId });

    if (!chat) {
      return res.status(200).json({
        messages: [],
      });
    }

    res.status(200).json({
      messages: chat.messages,
    });
  } catch (error) {
    console.error("GET CHAT ERROR:", error);

    res.status(500).json({
      message: "Failed to load chat history.",
    });
  }
};

// Save Chat History
export const saveChatHistory = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        message: "Messages are required.",
      });
    }

    const updatedChat = await Chat.findOneAndUpdate(
      { patientId },
      {
        patientId,
        messages,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Chat history saved successfully.",
      chat: updatedChat,
    });
  } catch (error) {
    console.error("SAVE CHAT ERROR:", error);

    res.status(500).json({
      message: "Failed to save chat history.",
    });
  }
};

// Clear Chat History
export const clearChatHistory = async (req, res) => {
  try {
    const patientId = req.user.id;

    await Chat.findOneAndDelete({ patientId });

    res.status(200).json({
      message: "Chat history cleared successfully.",
    });
  } catch (error) {
    console.error("CLEAR CHAT ERROR:", error);

    res.status(500).json({
      message: "Failed to clear chat history.",
    });
  }
};