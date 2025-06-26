import express from "express";
import {
  addComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/:postId", addComment);
router.delete("/:id", deleteComment);
router.put("/:id", updateComment);

export default router;
