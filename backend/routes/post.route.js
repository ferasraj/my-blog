import express from "express";
import {
  getPosts,
  getPost,
  creatPost,
  deletePost,
  testAuth,
} from "../controllers/post.controller.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", creatPost); // ⬅️ حماية إنشاء بوست
router.delete("/:id", deletePost); // ⬅️ حماية الحذف

router.get("/test-auth", testAuth); // ⬅️ أضف هذا المسار الجديد
router.delete("/test-auth", testAuth); // ⬅️ أضف هذا المسار الجديد لاختبار DELETE

export default router;
