import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const query = {};

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search?.trim();
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  // تصنيف
  if (cat) {
    query.category = cat;
  }

  // بحث دقيق
  if (searchQuery) {
    const words = searchQuery
      .split(" ")
      .filter((word) => word.length > 1)
      .map((word) => ({
        $or: [
          { title: { $regex: `\\b${word}\\b`, $options: "i" } },
          { content: { $regex: `\\b${word}\\b`, $options: "i" } },
          { category: { $regex: `\\b${word}\\b`, $options: "i" } },
        ],
      }));

    if (words.length > 0) {
      query.$and = words;
    }
  }

  // الكاتب
  if (author) {
    const user = await User.findOne({ username: author }).select("_id");
    if (!user) return res.status(404).json("No post found!");
    query.user = user._id;
  }

  // الفرز
  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "popular":
        sortObj = { visit: -1 };
        break;
      case "trending":
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
    }
  }

  // مميزة
  if (featured) {
    query.isFeatured = true;
  }

  const posts = await Post.find(query)
    .populate("user", "username img")
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    "username img clerkUserId"
  );
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
  let slug = req.body.title.replace(/ /g, "-").toLowerCase();

  let existingPost = await Post.findOne({ slug });

  let counter = 2;

  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }

  const newPost = new Post({ user: user._id, slug, ...req.body });
  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  // console.log("Authorization Header:", req.headers.authorization); //test fot token
  // console.log("Full req.auth() object:", req.auth()); //test for authorization
  const clerkUserId = req.auth().userId;
  // console.log("Clerk User ID:", clerkUserId); // user id test
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }
  const role = req.auth().sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json("Post has been deleted");
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json("User not found!");
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

export const featurePost = async (req, res) => {
  const clerkUserId = req.auth().userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth().sessionClaims?.metadata?.role || "user";

  if (role !== "admin") {
    return res.status(403).json("You cannot feature posts!");
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const isFeatured = post.isFeatured;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { new: true }
  );

  res.status(200).json(updatedPost);
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const updatePost = async (req, res) => {
  const clerkUserId = req.auth().userId;
  const postId = req.params.id;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth().sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    return res.status(200).json(updatedPost);
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json("User not found!");
  }

  const postToUpdate = await Post.findOne({
    _id: postId,
    user: user._id,
  });

  if (!postToUpdate) {
    return res.status(403).json("You can only update your own posts!");
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

//!
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "clerkUserId"
    );
    if (!post) return res.status(404).json("Post not found");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json("Failed to fetch post");
  }
};
