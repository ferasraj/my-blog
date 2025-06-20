import express from "express";
import {
  getPosts,
  getPost,
  creatPost,
  deletePost,
  uploadAuth,
} from "../controllers/post.controller.js";
const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", creatPost);
router.delete("/:id", deletePost);

export default router;
