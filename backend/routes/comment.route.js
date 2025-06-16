import express from "express";

const router = express.Router();

router.get("/co", (req, res) => {
  res.status(200).send("User co");
});
export default router;
