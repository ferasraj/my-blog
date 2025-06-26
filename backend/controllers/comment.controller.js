import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getPostComments = async (req, res) => {
  const postId = req.params.postId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const comments = await Comment.find({ post: postId })
    .populate("user", "username img _id")
    .sort({ createdAt: -1 }) // الأحدث أولًا
    .limit(limit)
    .skip((page - 1) * limit);

  const total = await Comment.countDocuments({ post: postId });
  const hasMore = page * limit < total;

  res.status(200).json({ comments, hasMore });
};

export const addComment = async (req, res) => {
  const clerkUserId = req.auth().userId;
  const postId = req.params.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const newComment = new Comment({
    ...req.body,
    user: user._id,
    post: postId,
  });

  const savedComment = await newComment.save();
  setTimeout(() => {
    res.status(201).json(savedComment);
  }, 3000);
};
export const deleteComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const id = req.params.id;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth().sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    await Comment.findByIdAndDelete(id);
    return res.status(200).json("Comment has been deleted");
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) return res.status(401).json("User not found");

  const comment = await Comment.findById(id);
  if (!comment) return res.status(404).json("Comment not found");

  const post = await Post.findById(comment.post);
  if (!post) return res.status(404).json("Post not found");

  console.log("Comment user:", comment.user);
  console.log("Post user:", post.user);

  const commentUserId = comment.user._id || comment.user;
  const postUserId = post.user._id || post.user;

  if (
    commentUserId.toString() === user._id.toString() ||
    postUserId.toString() === user._id.toString()
  ) {
    await Comment.findByIdAndDelete(id);
    return res.status(200).json("Comment deleted");
  }

  return res
    .status(403)
    .json("You can delete only your comment or comments on your post!");
};

//!!!!!!!!!!
export const updateComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const comment = await Comment.findById(req.params.id).populate("user");

  if (!comment) return res.status(404).json("Comment not found");

  const user = await User.findOne({ clerkUserId });
  if (!user || !comment.user._id.equals(user._id)) {
    return res.status(403).json("You can only edit your own comment!");
  }

  comment.desc = req.body.desc;
  await comment.save();

  res.status(200).json("Comment updated");
};
