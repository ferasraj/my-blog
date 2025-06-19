import React from "react";
import { twMerge } from "tailwind-merge";
import PostListItem from "./PostListItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
  console.log(`${import.meta.env.VITE_API_URL}`);
  return res.data;
};

const PostList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetchPosts(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log(data);
  return (
    <main className={twMerge("flex flex-col gap-12 mb-8 ")}>
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </main>
  );
};

export default PostList;
