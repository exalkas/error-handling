import express from "express";
import { addComment, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/add", addComment);
router.delete("/delete", deleteComment);

export default router;
