import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
} from "../controllers/chatHistoryController.js";

const router = express.Router();

// Load current user's chat history
router.get("/", authMiddleware, getChatHistory);

// Save current user's chat history
router.post("/save", authMiddleware, saveChatHistory);

// Clear current user's chat history
router.delete("/clear", authMiddleware, clearChatHistory);

export default router;