import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};
export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.status(200).json(post);
};

export const creatPost = async (req, res) => {
  const clerkUserId = req.auth().userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json("User not found!");
  }

  const newPost = new Post({ user: user._id, ...req.body });
  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth().userId; // هنا يتم الحصول على الـ userId
  console.log("Clerk User ID:", clerkUserId); // هنا يتم طباعة قيمته

  if (!clerkUserId) {
    // هذا الشرط يتحقق إذا كان clerkUserId هو null أو undefined
    return res.status(401).json("Not authenticated!"); // إذا تحقق الشرط، يجب أن يرجع 401
  }
  const user = await User.findOne({ clerkUserId }); // هذا السطر يتم تنفيذه فقط إذا كان clerkUserId ليس null

  if (!user) {
    // هذا الشرط يتحقق إذا لم يتم العثور على المستخدم في قاعدة البيانات
    return res.status(404).json("User not found!"); // إذا تحقق الشرط، يجب أن يرجع 404
  }
  const deletedPost = await Post.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    return res.status(403).json("You can delete only your posts!");
  }

  res.status(200).json("Post has been deleted");
};

export const testAuth = async (req, res) => {
  const clerkUserId = req.auth().userId;
  console.log("Test Auth - Clerk User ID:", clerkUserId);
  if (clerkUserId) {
    res.status(200).json({ message: "Authenticated!", userId: clerkUserId });
  } else {
    res.status(401).json({ message: "Not authenticated! (Test Auth)" });
  }
};
