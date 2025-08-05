import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllMessage, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post('/send/:id',isAuthenticated,sendMessage);
router.get('/get/:id',isAuthenticated,getAllMessage);

export default router;
