import express from "express";
import {
  getPosts,
  getPost,
  creatPost,
  deletePost,
  uploadAuth,
  featurePost,
  updatePost,
  getPostById,
} from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";
const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", creatPost);
router.delete("/:id", deletePost);
router.patch("/feature", featurePost);
router.get("/find/:id", getPostById);

//!!!!!!!!!!!!!!!
router.patch("/:id", updatePost);

export default router;
